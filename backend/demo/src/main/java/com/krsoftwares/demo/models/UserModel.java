package com.krsoftwares.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Usuario")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true) //Pode usar name = para colocar o nome da coluna
    private String email;

    @Column(nullable = false)
    private String password;   

    @ManyToOne
    @JoinColumn(name = "setor_id", nullable = false)
    private SetorModel setor;

} 