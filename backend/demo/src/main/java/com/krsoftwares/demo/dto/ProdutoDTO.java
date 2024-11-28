package com.krsoftwares.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProdutoDTO {
    private String SKU;
    private String nome;
    private String unMedida;
    private Integer quantidadeSolicitada;
    private Integer quantidadeEntregue;
    private String observacao;
}
