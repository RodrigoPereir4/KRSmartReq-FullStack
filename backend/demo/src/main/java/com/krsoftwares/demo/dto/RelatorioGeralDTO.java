package com.krsoftwares.demo.dto;

import java.util.Date;

import com.krsoftwares.demo.models.RequisicaoModel;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RelatorioGeralDTO {
    private RequisicaoModel requisicaoId;
    private Long id;
    private String solicitante;
    private Date dataSolicitada;
    private Date dataEntrega;
}
