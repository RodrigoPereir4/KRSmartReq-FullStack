package com.krsoftwares.demo.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/login")
    public String loginUsuario(@RequestBody UserModel userModel) {

        Optional<UserModel> userOptional = userRepository.findByEmail(userModel.getEmail());

        if (userOptional.isEmpty()) {
            return "Usuário ou senha incorretos.";
        }

        UserModel user = userOptional.get();

        if (!user.getPassword().equals(userModel.getPassword())) {
            return "Usuário ou senha incorretos.";
        }

        return "Login realizado com sucesso!";
    }

    @GetMapping("/listar")
    public Iterable<UserModel> listarUsuarios() {
        return userRepository.findAll();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> create(@RequestBody UserModel user) {
        userService.create(user);
        return ResponseEntity.ok("Usuário cadastrado!");
    }

    @PutMapping("editar/{id}")
    public ResponseEntity<String> editar(@RequestBody UserModel user, @PathVariable int id) {
        if (userService.update(user, id)) {
            return ResponseEntity.ok("Usuário editado!");
        }
        return ResponseEntity.ok("Usuário não encontrado!");
    }

    @PutMapping("inativar/{id}")
    public ResponseEntity<String> inativar(@PathVariable int id) {
        userService.inativar(id);
        return ResponseEntity.ok("Usuário inativado");
    }
}