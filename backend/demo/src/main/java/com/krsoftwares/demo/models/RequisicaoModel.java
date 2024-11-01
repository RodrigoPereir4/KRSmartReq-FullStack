package com.krsoftwares.demo.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "requisicao")
public class RequisicaoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long requisicaoId;

    @ManyToOne
    @JoinColumn(name = "setor_id", nullable = false)
    private SetorModel setorId;

    @ManyToOne
    @JoinColumn(name = "solicitante", nullable = false)
    private UserModel nome;

    private boolean status;

    @Column(nullable = false)
    private LocalDateTime dataSolicitada;

    @Column(nullable = false)
    private LocalDateTime dataEntrega;

    @OneToMany(mappedBy = "requisicaoId", cascade = CascadeType.ALL)
    private List<ItemRequisicaoModel> itens; 

}
