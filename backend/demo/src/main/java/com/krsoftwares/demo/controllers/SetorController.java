package com.krsoftwares.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.models.SetorModel;
import com.krsoftwares.demo.repository.SetorRepository;

@RestController
@RequestMapping("/setor")
@CrossOrigin(origins = "*")
public class SetorController {
    
    @Autowired
    private SetorRepository setorRepository;

    @PostMapping("/cadastrar")
    public String registrarSetor(@RequestBody SetorModel setor){    
        setorRepository.save(setor);
        return "Setor registrado com sucesso!";
    }

    @GetMapping("/listar")
    public Iterable<SetorModel> listarSetores(){
        return setorRepository.findAll();
    }
}
