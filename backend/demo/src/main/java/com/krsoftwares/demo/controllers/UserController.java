package com.krsoftwares.demo.controllers;

import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
        return "Login realizado com sucesso!";
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

}