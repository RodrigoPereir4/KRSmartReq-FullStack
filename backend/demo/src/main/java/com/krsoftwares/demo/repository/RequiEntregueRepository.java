package com.krsoftwares.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.models.RequisicaoEntregueModel;


@Repository
public interface RequiEntregueRepository extends JpaRepository<RequisicaoEntregueModel, Long>{
    
    Optional<RequisicaoEntregueModel> findById(int id);
}
