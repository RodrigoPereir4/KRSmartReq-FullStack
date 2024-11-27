package com.krsoftwares.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.krsoftwares.demo.models.ProdutoModel;
import com.krsoftwares.demo.repository.ProdutoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProdutoServiceImpl implements ProdutoService {

    @Autowired
    ProdutoRepository produtoRepository;

    @Override
    public List<ProdutoModel> listAll() {
        return produtoRepository.findAll();
    }

    @Override
    public ProdutoModel create(ProdutoModel produto) {
        if (produto.getSKU() == null) {
            throw new RuntimeException("SKU OBRIGATÓRIO!");
        }
        return produtoRepository.save(produto);
    }

    @Override
    public Boolean update(ProdutoModel produtoAtt, String SKU) {
        Optional<ProdutoModel> produto = produtoRepository.findBySKU(SKU);

        if (produto.isPresent()) {
            ProdutoModel produtoExistente = produto.get();
            produtoExistente.setNome(produtoAtt.getNome());
            produtoExistente.setCategoria(produtoAtt.getCategoria());
            produtoExistente.setStatus(produtoAtt.isStatus());
            produtoExistente.setUnMedida(produtoAtt.getUnMedida());

            produtoRepository.save(produtoExistente);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String inativar(String SKU) {
        Optional<ProdutoModel> produtoOpt = produtoRepository.findBySKU(SKU);

        if(produtoOpt.isEmpty()){
            return "Produto não encontrado";
        }

        produtoOpt.get().setStatus(false);

        produtoRepository.save(produtoOpt.get());

        return "Produto inativado!";
    }

}
