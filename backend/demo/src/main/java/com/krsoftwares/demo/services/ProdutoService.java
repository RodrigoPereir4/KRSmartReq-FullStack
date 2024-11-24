package com.krsoftwares.demo.services;

import java.util.List;

import com.krsoftwares.demo.models.ProdutoModel;

public interface ProdutoService {
    List<ProdutoModel> listAll();
    ProdutoModel create(ProdutoModel produto);
    ProdutoModel update(ProdutoModel produto, String SKU);
    void delete(String sku);
}
