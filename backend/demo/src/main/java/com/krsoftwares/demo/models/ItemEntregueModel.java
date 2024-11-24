package com.krsoftwares.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "item_entregue")
public class ItemEntregueModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "entrega_id", referencedColumnName = "id")
    @JsonIgnore
    private RequisicaoEntregueModel requisicaoEntId;

    @ManyToOne
    @JoinColumn(name = "produto_id", referencedColumnName = "SKU")
    private ProdutoModel produto;

    @Column(name = "quantidade")
    private Integer quantidade;
}
