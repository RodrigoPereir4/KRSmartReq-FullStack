package com.krsoftwares.demo.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.models.SetorModel;

@Repository
public interface SetorRepository extends JpaRepository<SetorModel, Integer> {

    Optional<SetorModel> findBySetorNome (String setor);

}
