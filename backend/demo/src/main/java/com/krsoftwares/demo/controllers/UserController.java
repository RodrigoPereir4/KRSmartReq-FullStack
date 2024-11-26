package com.krsoftwares.demo.controllers;

import java.nio.file.attribute.UserPrincipal;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.models.UserModel;
import com.krsoftwares.demo.repository.UserRepository;
import com.krsoftwares.demo.services.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public String loginUsuario(@RequestBody UserModel userModel) {

        Optional<UserModel> userOptional = userRepository.findByEmail(userModel.getEmail());

        if (!userOptional.isPresent()) {
            return "Usuário ou senha incorretos.";
        }

        UserModel user = userOptional.get();

        if (!passwordEncoder.matches(userModel.getPassword(), user.getPassword())) {
            return "Usuário ou senha incorretos.";
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                userModel.getPassword(),
                getAuthorities(user));

        try {

            Authentication userAutenticado = authenticationManager.authenticate(authentication);
            SecurityContextHolder.getContext().setAuthentication(userAutenticado);
            return "Login realizado com sucesso!";

        } catch (AuthenticationException ex) {
            return "Usuário ou senha incorreto";
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/listar")
    public Iterable<UserModel> listarUsuarios() {
        return userRepository.findAll();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> create(@RequestBody UserModel user) {
        userService.create(user);
        return ResponseEntity.ok("Usuário cadastrado!");
    }

    private Collection<? extends GrantedAuthority> getAuthorities(UserModel user) {
        return user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList());
    }
}