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

export async function atualizarProdutos(id, dadosProdutos){

    const url = 'http://localhost:8080/users/atualizar/' + id;

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

export async function procurarProdutoNome(nome){

    const url = `http://localhost:8080/setor/procurarSetor?setorNome=${nome}`;

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