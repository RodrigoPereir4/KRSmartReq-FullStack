package com.krsoftwares.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.models.ProdutoModel;

@Repository
public interface ProdutoRepository extends JpaRepository<ProdutoModel, String> {
    
    Optional<ProdutoModel> findBySKU(String sku);

    Optional<ProdutoModel> findByNome(String nome);

    ProdutoModel deleteBySKU(String SKU);

    boolean existsBySKU(String SKU);

    @Query("SELECT p.nome FROM ProdutoModel p")
    Iterable<String> findAllNome();

    @Query("SELECT p.categoria FROM ProdutoModel p GROUP BY p.categoria")
    Iterable<String> findAllCategoria();

    @Query("SELECT p.unMedida FROM ProdutoModel p GROUP BY p.unMedida")
    Iterable<String> findAllUnidadeMedida();

    @Query("SELECT p.nome FROM ProdutoModel p WHERE p.categoria = :categoria")
    Iterable<String> filterCategory(String categoria);
}
