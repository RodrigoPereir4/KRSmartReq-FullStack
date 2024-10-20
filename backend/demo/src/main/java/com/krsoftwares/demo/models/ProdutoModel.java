package com.krsoftwares.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Produto")
public class ProdutoModel {
    
    @Id
    @Column(name = "SKU", nullable = false, unique = true)
    private String SKU;

    @Column(name = "Nome", nullable = false)
    private String nome;

    @Column(name = "Status", nullable = false)
    private boolean status;

    @Column(name = "Categoria", nullable = false)
    private String categoria;

    @Column(name = "Unidade_Medida", nullable = false)
    private String unMedida;
}
