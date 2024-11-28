package com.krsoftwares.demo.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.krsoftwares.demo.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> loginUsuario(HttpSession session, @RequestBody UserModel userModel) {

        Optional<UserModel> userOptional = userRepository.findByEmail(userModel.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos.");
        }

        UserModel user = userOptional.get();

        if (!user.getPassword().equals(userModel.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos.");
        }

        session.setAttribute("usuarioLogado", user);

        return ResponseEntity.ok("Login realizado com sucesso!");
    }

    @GetMapping("/listar")
    public Iterable<UserModel> listarUsuarios() {
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
    public ResponseEntity<String> create(@RequestBody UserModel user) {
        userService.create(user);
        return ResponseEntity.ok("Usuário cadastrado!");
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editar(@RequestBody UserModel user, @PathVariable int id) {
        if (userService.update(user, id)) {
            return ResponseEntity.ok("Usuário editado!");
        }
        return ResponseEntity.ok("Usuário não encontrado!");
    }

    @PutMapping("/inativar/{id}")
    public ResponseEntity<String> inativar(@PathVariable int id) {
        if (userService.inativar(id)) {
            return ResponseEntity.ok("Usuário inativado");
        }
        return ResponseEntity.ok("Usuário não encontrado!");
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