package com.krsoftwares.demo.services;

import java.util.List;

import com.krsoftwares.demo.models.ProdutoModel;

public interface ProdutoService {
    List<ProdutoModel> listAll();
    ProdutoModel create(ProdutoModel produto);
    Boolean update(ProdutoModel produto, String SKU);
    String inativar(String sku);
}
