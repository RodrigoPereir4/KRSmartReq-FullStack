package com.krsoftwares.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/requisicao")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RequisicaoController {

    @Autowired
    private RequisicaoRepository requisicaoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping("/requisitar")
    public ResponseEntity<String> gerar(@RequestBody RequisicaoModel objeto, HttpSession session) {

        UserModel usuarioLogado = (UserModel) session.getAttribute("usuarioLogado");

        if (usuarioLogado == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado.");
        }

        objeto.setUsuario(usuarioLogado);

        if (objeto.getItens() == null || objeto.getItens().isEmpty()) {
            return ResponseEntity.ok("Adicione itens a requisição!");
        }

        if (objeto.getItens() != null) {
            for (ItemRequisicaoModel item : objeto.getItens()) {
                ProdutoModel produto = produtoRepository.findBySKU(item.getProduto().getSKU())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

                item.setProduto(produto);// associa o item ao produto encontrado...
                item.setRequisicaoId(objeto);// associa a requisição ao item...
            }
        }

        objeto.setItemRequisicao(objeto.getItens());
        objeto.setStatus(true);// toda requisição gerada automaticamente fica pendente
        requisicaoRepository.save(objeto);

        return ResponseEntity.ok("Requisição gerada com sucesso!");
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<String> excluir(@PathVariable("id") Long id) {

        RequisicaoModel requisicao = requisicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Requisição não encontrada"));

        requisicaoRepository.delete(requisicao);
        return ResponseEntity.ok("Requisição do ID " + id + " excluída com sucesso");
    }

    @GetMapping("/listar")
    public ResponseEntity listar() {
        Iterable<RequisicaoModel> requisicoes = requisicaoRepository.findAll();
        return ResponseEntity.ok(requisicoes);
    }
}
