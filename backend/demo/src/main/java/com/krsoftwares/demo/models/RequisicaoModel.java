package com.krsoftwares.demo.models;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Entity
@Table(name = "requisicao")
public class RequisicaoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long requisicaoId;

    @ManyToOne
    @JoinColumn(name = "Setor", referencedColumnName = "id")
    private UserModel nome;//alterar posteriormente para "usuarioSetor"
    
    @Column(nullable = false)
    private String solicitante;//NOME DO COLABORADOR QUE REQUISITOU OS PRODUTOS

    private boolean status;

    @Column(nullable = false)
    private Date dataSolicitada;

    @Column(nullable = false)
    private Date dataEntrega;

    @OneToMany(mappedBy = "requisicaoId", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, 
    orphanRemoval = true, fetch = FetchType.LAZY)
    @Setter(value = AccessLevel.NONE)
    private List<ItemRequisicaoModel> itens; 

    public void setItemRequisicao(List<ItemRequisicaoModel> itemRequi){
        for(ItemRequisicaoModel i: itemRequi){
            i.setRequisicaoId(this);
        }
        this.itens = itemRequi;
    }
}
