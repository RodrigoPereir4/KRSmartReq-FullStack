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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.models.ProdutoModel;
import com.krsoftwares.demo.models.UserModel;
import com.krsoftwares.demo.repository.ProdutoRepository;

import jakarta.validation.Valid;
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

    @PutMapping("/atualizar/{SKU}")
    public String editar(@PathVariable String SKU, @RequestBody ProdutoModel produtoAtt){
        Optional<ProdutoModel> produto = produtoRepository.findBySKU(SKU);  

        if(!produto.isPresent()){
            return "Esse Usuario não foi encontrado!";
        }

        ProdutoModel produtoExistente = produto.get();
        
        produtoExistente.setNome(produtoAtt.getNome());
        produtoExistente.setCategoria(produtoAtt.getCategoria());
        produtoExistente.setStatus(produtoAtt.isStatus());
        produtoExistente.setUnMedida(produtoAtt.getUnMedida());

        produtoRepository.save(produtoExistente);

        return "Produto Atualizado com sucesso!";
    }

    @GetMapping("/listarNome")
    public Iterable<String> listarProdutos(@RequestParam(required = false) String category){
        if(category == null){
            return produtoRepository.findAllNome();
        }
        return produtoRepository.filterCategory(category);
    }

    @GetMapping("/listarCategoria")
    public Iterable<String> listarCategoria() {
        return produtoRepository.findAllCategoria();
    }

    @GetMapping("/listarUnidadeMedida")
    public Iterable<String> listarUnidadeMedida() {
        return produtoRepository.findAllUnidadeMedida();
    }

    @GetMapping("/procurarNome")
    public ProdutoModel procurarNome(@RequestParam (required = true) String nome){
        Optional<ProdutoModel> produtoOptional = produtoRepository.findByNome(nome);
        if(produtoOptional.isPresent()){
            return produtoOptional.get();
        } else {
            return null;
        }
    }
}
