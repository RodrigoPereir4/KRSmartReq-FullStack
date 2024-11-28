package com.krsoftwares.demo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.dto.SetorRequisicaoDTO;
import com.krsoftwares.demo.models.RequisicaoModel;

@Repository
public interface RequisicaoRepository extends JpaRepository<RequisicaoModel, Long> {

    @Query("SELECT new com.krsoftwares.demo.dto.SetorRequisicaoDTO(s.setorId, s.setorNome, r.status, COUNT(r.requisicaoId)) " +
    "FROM RequisicaoModel r " +
    "JOIN r.usuario u " +
    "JOIN u.setor s " + 
    "WHERE r.status = true " +
    "GROUP BY s.setorNome, s.setorId, r.status")
    List<SetorRequisicaoDTO> findRequisicaoPorSetor();
    
    Optional<RequisicaoModel> findById (Long id);
}
