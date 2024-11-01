package com.krsoftwares.demo.models;

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
@Table(name="ItemRequisicao")
public class ItemRequisicaoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long itemRequisitadoID;

    @ManyToOne
    @JoinColumn(name = "requisicao_id", nullable = false)
    private RequisicaoModel requisicaoId;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private ProdutoModel SKU;

    @Column(nullable = false)
    private Integer quantidade;
}
