package com.krsoftwares.demo.controllers;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.dto.ItemRequisitadoDTO;
import com.krsoftwares.demo.models.ItemEntregueModel;
import com.krsoftwares.demo.models.ProdutoModel;
import com.krsoftwares.demo.models.RequisicaoEntregueModel;
import com.krsoftwares.demo.models.RequisicaoModel;
import com.krsoftwares.demo.repository.ItemRequisicaoRepository;
import com.krsoftwares.demo.repository.ProdutoRepository;
import com.krsoftwares.demo.repository.RequiEntregueRepository;
import com.krsoftwares.demo.repository.RequisicaoRepository;

@RestController
@RequestMapping("/estoque")
@CrossOrigin(origins = "*")
public class RequiEntregueController {

    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    RequiEntregueRepository requiEntregueRepository;

    @Autowired
    RequisicaoRepository requisicaoRepository;

    @Autowired
    ItemRequisicaoRepository itemRequisicaoRepository;

    @PostMapping("{id}")
    public ResponseEntity<String> entrega(@PathVariable Long id, @RequestBody RequisicaoEntregueModel objeto) {

        Optional<RequisicaoModel> requisicaoOpt = requisicaoRepository.findById(id);

        if (!requisicaoOpt.isPresent()) {
            return ResponseEntity.status(404).body("Requisição não encontrada");
        }

        if(!requisicaoOpt.get().isStatus()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requisição já está finalizada");
        }

        if(objeto.getItens() == null || objeto.getItens().isEmpty()){
            return ResponseEntity.ok("Adicione itens a entrega!");
        }

        RequisicaoModel requisicao = requisicaoOpt.get();

        objeto.setRequisicaoId(requisicao);
        objeto.setDataEntrega(new Date());

        if (objeto.getItens() != null) {
            for (ItemEntregueModel item : objeto.getItens()) {
                ProdutoModel produto = produtoRepository.findBySKU(item.getProduto().getSKU())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

                item.setProduto(produto);// associa o item ao produto encontrado...
                item.setRequisicaoEntId(objeto);// associa a requisição ao item...
            }
        }

        objeto.setItemRequisicao(objeto.getItens());

        requisicao.setStatus(false);// se a entrega foi realizada, a requisicao não está mais pendente

        requiEntregueRepository.save(objeto);

        return ResponseEntity.ok("Requisição finalizada!");
    }

    @GetMapping("/listar")
    public ResponseEntity listar() {
        Iterable<RequisicaoEntregueModel> requisicoes = requiEntregueRepository.findAll();
        return ResponseEntity.ok(requisicoes);
    }

    @GetMapping("/itemRequisitado/{requisicaoId}")
    public ResponseEntity itemRequisitado(@PathVariable Long requisicaoId) {
        Iterable<ItemRequisitadoDTO> itens = itemRequisicaoRepository.findItensRequisicao(requisicaoId);
        return ResponseEntity.ok(itens);
    }
}
