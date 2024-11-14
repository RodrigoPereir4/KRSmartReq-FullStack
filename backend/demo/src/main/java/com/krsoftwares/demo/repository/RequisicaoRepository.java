package com.krsoftwares.demo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.models.RequisicaoModel;

@Repository
public interface RequisicaoRepository extends JpaRepository<RequisicaoModel, Long> {
    
    Optional<RequisicaoModel> findById (Long id);
}
