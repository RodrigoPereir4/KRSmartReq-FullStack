package com.krsoftwares.demo.controllers;

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

import com.krsoftwares.demo.models.ProdutoModel;
import com.krsoftwares.demo.services.ProdutoService;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> create(@RequestBody ProdutoModel produto) {
        produtoService.create(produto);
        return ResponseEntity.ok("Produto cadastrado!");
    }

    @GetMapping("/listar")
    public Iterable<ProdutoModel> listar() {
        return produtoService.listAll();
    }

    @PutMapping("/editar/{SKU}")
    public ResponseEntity<String> editar(@PathVariable String SKU, @RequestBody ProdutoModel produto) {
        if (produtoService.update(produto, SKU)) {
            return ResponseEntity.ok("Produto editado com sucesso!");
        }
        return ResponseEntity.ok("Produto não encontrado!");
    }

    @PutMapping("/inativar/{SKU}")
    public ResponseEntity<String> intivar(@PathVariable String sku) {
        produtoService.inativar(sku);
        return ResponseEntity.ok("Produto inativado");
    }

}
