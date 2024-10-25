package com.krsoftwares.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "Produto")
public class ProdutoModel {
    
    @Id
    @Column(name = "SKU", nullable = false, unique = true, length = 16)
    @Size(max = 20, message = "O SKU pode ter no máximo 16 caracteres")
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
