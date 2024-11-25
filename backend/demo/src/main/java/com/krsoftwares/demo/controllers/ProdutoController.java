package com.krsoftwares.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.models.ProdutoModel;
import com.krsoftwares.demo.services.ProdutoService;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;

    @PreAuthorize("hasAnyRole('ADMIN', 'ALMOXARIFE')")
    @PostMapping("/cadastrar")
    public ResponseEntity<String> create(@RequestBody ProdutoModel produto){
         produtoService.create(produto);
         return ResponseEntity.ok("Produto cadastrado!");
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'ALMOXARIFE')")
    @GetMapping("/listar")
    public Iterable<ProdutoModel> listar(){
        return produtoService.listAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ALMOXARIFE')")
    @PutMapping("/{SKU}")
    public ResponseEntity<String> editar2(@PathVariable String SKU, @RequestBody ProdutoModel produto){
        produtoService.update(produto, SKU);
        return ResponseEntity.ok("Produto editado com sucesso!");
    }
}
