package com.krsoftwares.demo.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Setor")
public class SetorModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer setorId;

    @Column(nullable = false, unique = true)
    private String setorNome;
    
    @OneToMany
    private List<UserModel> usuarios;    
}
