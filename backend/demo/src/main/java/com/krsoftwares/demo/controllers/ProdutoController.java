package com.krsoftwares.demo.controllers;

import java.util.Optional;

import org.hibernate.PropertyValueException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.models.ProdutoModel;
import com.krsoftwares.demo.repository.ProdutoRepository;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {
    
    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/listar")
    public Iterable<ProdutoModel> listarProdutos(){
        return produtoRepository.findAll();
    }

    @PostMapping("/cadastrar")
    public String Cadastrar(@RequestBody ProdutoModel produto){
        String msg = "Não foi possível cadastrar o produto";

        try {
            if(produtoRepository.existsBySKU(produto.getSKU())){
                msg = "SKU já cadastrado";
            } else {
                produtoRepository.save(produto);
                msg = "Produto cadastrado!";
            }
            
        } catch (PropertyValueException e) {
            msg = "Preencha todos os campos";
        }

        return msg;
    }
}
