package com.krsoftwares.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.models.ItemRequisicaoModel;

@Repository
public interface ItemRequisicaoRepository extends JpaRepository<ItemRequisicaoModel, Long> {
    
}
