package com.krsoftwares.demo.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.models.UserModel;
import com.krsoftwares.demo.repository.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired 
    private UserRepository userRepository;

    @PostMapping("/login")
    public String loginUsuario(@RequestBody UserModel userModel){

        Optional<UserModel> userOptional = userRepository.findByEmail(userModel.getEmail());
        if(!userOptional.isPresent()){
            return "Usuário não encontrado!";
        }
        if(!userOptional.get().getPassword().equals(userModel.getPassword())){
            return "Senha incorreta";
        }
        return "Login realizado com sucesso!";
    }

    @GetMapping("/listar")
    public Iterable<UserModel> listarUsuarios(){
        return userRepository.findAll();
    }
}

