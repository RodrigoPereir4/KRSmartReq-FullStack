package com.krsoftwares.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.models.ItemRequisicaoModel;
import com.krsoftwares.demo.models.ProdutoModel;
import com.krsoftwares.demo.models.RequisicaoModel;
import com.krsoftwares.demo.models.UserModel;
import com.krsoftwares.demo.repository.ProdutoRepository;
import com.krsoftwares.demo.repository.RequisicaoRepository;
import com.krsoftwares.demo.security.UserPrincipal;

@RestController
@RequestMapping("/requisicao")
@CrossOrigin(origins = "*")
public class RequisicaoController {

    @Autowired
    private RequisicaoRepository requisicaoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping("/requisitar")
    public ResponseEntity<String> gerar(@RequestBody RequisicaoModel objeto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Usuário não autenticado");
        }
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        UserModel user = userPrincipal.getUserModel();

        objeto.setUsuario_setor(user);

        if (objeto.getItens() != null) {
            for (ItemRequisicaoModel item : objeto.getItens()) {
                ProdutoModel produto = produtoRepository.findBySKU(item.getProduto().getSKU())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

                item.setProduto(produto);// associa o item ao produto encontrado...
                item.setRequisicaoId(objeto);// associa a requisição ao item...
            }
        }

        objeto.setItemRequisicao(objeto.getItens());
        objeto.setStatus(true);//toda requisição gerada automaticamente fica pendente
        requisicaoRepository.save(objeto);

        return ResponseEntity.ok("Requisição gerada com sucesso!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable("id") Long id) {

        RequisicaoModel requisicao = requisicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Requisição não encontrada"));

        requisicaoRepository.delete(requisicao);
        return ResponseEntity.ok("Requisição do ID " + id + " excluída com sucesso");
    }

    @PreAuthorize("hasAnyRole('ADMIN','ALMOXARIFE')")
    @GetMapping("/listar")
    public ResponseEntity listar() {
        Iterable<RequisicaoModel> requisicoes = requisicaoRepository.findAll();
        return ResponseEntity.ok(requisicoes);
    }
}
