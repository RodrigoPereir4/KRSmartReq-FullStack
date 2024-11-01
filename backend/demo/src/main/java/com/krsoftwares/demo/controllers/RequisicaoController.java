package com.krsoftwares.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.repository.RequisicaoRepository;

@RestController
@RequestMapping("/requisicao")
@CrossOrigin(origins = "*")
public class RequisicaoController {
    
    @Autowired
    private RequisicaoRepository requisicaoRepository;

    
}
