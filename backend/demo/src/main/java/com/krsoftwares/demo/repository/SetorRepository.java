package com.krsoftwares.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.models.SetorModel;

@Repository
public interface SetorRepository extends JpaRepository<SetorModel, Integer> {
    
}
