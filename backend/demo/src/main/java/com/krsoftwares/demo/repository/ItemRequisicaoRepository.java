package com.krsoftwares.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.dto.ItemRequisitadoDTO;
import com.krsoftwares.demo.models.ItemRequisicaoModel;

@Repository
public interface ItemRequisicaoRepository extends JpaRepository<ItemRequisicaoModel, Long> {
    
    @Query("SELECT new com.krsoftwares.demo.dto.ItemRequisitadoDTO(i.produto.SKU, i.produto.nome, i.produto.unMedida, i.quantidade) " +
           "FROM ItemRequisicaoModel i WHERE i.requisicaoId.requisicaoId = :requisicaoId")
    List<ItemRequisitadoDTO> findItensRequisicao(@Param("requisicaoId") Long requisicaoId);
}
