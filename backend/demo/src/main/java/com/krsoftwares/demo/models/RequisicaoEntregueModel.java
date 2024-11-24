package com.krsoftwares.demo.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Entity
@Table(name = "requisicao_finalizada")
public class RequisicaoEntregueModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "requisicao_id", referencedColumnName = "requisicaoId")
    private RequisicaoModel requisicaoId;


    @Column(nullable = false)
    private Date dataEntrega;

    @Column(nullable = false)
    @Size(max = 500)
    private String observacao;

    @OneToMany(mappedBy = "requisicaoEntId", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, 
    orphanRemoval = true, fetch = FetchType.LAZY)
    @Setter(value = AccessLevel.NONE)
    private List<ItemEntregueModel> itens;

    public void setItemRequisicao(List<ItemEntregueModel> itemEntregue){
        for(ItemEntregueModel i: itemEntregue){
            i.setRequisicaoEntId(this);
        }
        this.itens = itemEntregue;
    }
}
