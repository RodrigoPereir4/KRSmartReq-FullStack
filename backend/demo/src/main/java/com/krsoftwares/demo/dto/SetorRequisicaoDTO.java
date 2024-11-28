package com.krsoftwares.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SetorRequisicaoDTO {
    private String setor;
    private Integer setorId;
    private Boolean situacao;
    private Long qtdRequisicao;
}