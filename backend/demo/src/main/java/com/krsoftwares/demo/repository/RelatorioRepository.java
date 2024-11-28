package com.krsoftwares.demo.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.krsoftwares.demo.dto.RelatorioGeralDTO;
import com.krsoftwares.demo.models.RequisicaoEntregueModel;

public interface RelatorioRepository extends JpaRepository<RequisicaoEntregueModel, Long> {

    @Query("SELECT new com.krsoftwares.demo.dto.RelatorioGeralDTO(e.requisicaoId, e.id, r.solicitante, r.dataSolicitada, r.dataEntrega) " +
       "FROM RequisicaoModel r " +
       "INNER JOIN RequisicaoEntregueModel e ON e.requisicaoId.requisicaoId = r.requisicaoId " +
       "WHERE (r.dataSolicitada BETWEEN :dataInicio AND :dataFim) " +
       "OR (r.dataEntrega BETWEEN :dataInicio AND :dataFim)")
    Iterable<RelatorioGeralDTO> findRelatorioGeral(
        @Param("dataInicio") Date dataInicio,
        @Param("dataFim") Date dataFim
    );
}
