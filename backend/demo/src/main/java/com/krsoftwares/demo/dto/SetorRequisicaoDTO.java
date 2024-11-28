package com.krsoftwares.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SetorRequisicaoDTO {
    private Integer setorId;
    private String setor;
    private Boolean situacao;
    private Long qtdRequisicao;
}