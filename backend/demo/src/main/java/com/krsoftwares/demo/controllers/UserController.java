package com.krsoftwares.demo.controllers;

import java.util.Optional;

import org.hibernate.PropertyValueException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/listarPorCategoria")
    public Iterable<String> listarUsuarios(@RequestParam(required = false) Integer setor){
        if(setor == null){
            return userRepository.findAllEmail();
        }
        return userRepository.findBySetor(setor);
    }

    @GetMapping("/procurarProdutoNome")
    public UserModel procurarProdutoNome(@RequestParam(required = true) String nome){
        Optional<UserModel> userOptional = userRepository.findByEmail(nome);
        if(userOptional.isPresent()){
            return userOptional.get();
        } else {
            return null;
        }
    }

    @PostMapping("/cadastrar")
    public String cadastrarUsuario(@RequestBody UserModel user){
        String msg = "Erro! Não foi possivel cadastrar o usuário";
        
        try{
            if(userRepository.existsByEmail(user.getEmail())){
                msg = "Erro! Esse email já está cadastrado no sistema";
            }
            
            if(user.getEmail()!=null && user.getPassword()!=null && !userRepository.existsByEmail(user.getEmail())){
                userRepository.save(user);
                msg="Usuario Cadastrado com sucesso!";
            }
        } catch(PropertyValueException e){
            msg = "Preencha todos os campos necessarios!";
        }
        
        return msg;
    }

    @PutMapping("/atualizar/{idUsuario}")
    public String atualizarUsuario(@PathVariable Integer idUsuario, @RequestBody UserModel user){

        Optional<UserModel> userOptional = userRepository.findById(idUsuario);

        if(!userOptional.isPresent()){
            return "Esse Usuario não foi encontrado!";
        }

        UserModel usuarioExistente = userOptional.get();
        usuarioExistente.setEmail(user.getEmail());
        usuarioExistente.setPassword(user.getPassword());
        usuarioExistente.setSetor(user.getSetor());
        
        userRepository.save(usuarioExistente);

        return "Usuario Atualizado com sucesso!";
    }

}