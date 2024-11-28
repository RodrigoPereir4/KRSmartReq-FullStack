package com.krsoftwares.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.models.ItemRequisicaoModel;

@Repository
public interface ItemRequisicaoRepository extends JpaRepository<ItemRequisicaoModel, Long> {
    
    @Query("SELECT i FROM ItemRequisicaoModel i WHERE i.requisicaoId.requisicaoId = :requisicaoId")
    List<ItemRequisicaoModel> findItensRequisicao(@Param("requisicaoId") Long requisicaoId);
}
