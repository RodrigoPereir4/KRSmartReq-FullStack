export async function listarProdutos(){

    const url = 'http://localhost:8080/produto/listar';

    const response = await fetch(url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    
    if(!response.ok){
        alert("Falha no banco de dados!");
    }

    return response.json();
}

export async function cadastrarProdutos(dadosProdutos){

    const url = 'http://localhost:8080/produto/cadastrar';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProdutos)
    })
    
    if(!response.ok){
        alert("Falha no banco de dados!");
    }

    return response.text();
}

export async function atualizarProdutos(sku, dadosProdutos){

    const url = 'http://localhost:8080/produto/atualizar/' + sku;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProdutos)
    })
    
    if(!response.ok){
        alert("Falha no banco de dados!");
    }

    return response.text();
}

export async function inativarProdutos(sku){

    const url = 'http://localhost:8080/produto/inativar/' + sku;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if(!response.ok){
        alert("Falha no banco de dados!");
    }

    return response.text();
}