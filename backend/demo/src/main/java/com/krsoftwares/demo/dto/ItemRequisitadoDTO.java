package com.krsoftwares.demo.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonPropertyOrder({"SKU", "nome", "unMedida", "quantidade"})
public class ItemRequisitadoDTO {
    private String SKU;
    private String nome;
    private String unMedida;
    private Integer quantidade;
}
