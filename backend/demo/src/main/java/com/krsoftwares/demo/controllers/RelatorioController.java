package com.krsoftwares.demo.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.dto.RelatorioGeralDTO;
import com.krsoftwares.demo.repository.RelatorioRepository;

@RestController
@RequestMapping("/relatorio")
@CrossOrigin(origins = "*")
public class RelatorioController {
    
    @Autowired
    RelatorioRepository relatorioRepository;

    @GetMapping("/listar")
     public Iterable<RelatorioGeralDTO> listarRelatorioGeral(
        @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataInicio,
        @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataFim) {
        return relatorioRepository.findRelatorioGeral(dataInicio, dataFim);
    }

}
