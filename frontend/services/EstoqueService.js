export async function listarSetores(){

    const url = 'http://localhost:8080/requisicao/listarQtd';

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

export async function listarNumRequisicao(id){

    const url = 'http://localhost:8080/estoque/pendente/' + id;

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

export async function enviarEntrega(idRequisicao, dados){

    const url = 'http://localhost:8080/estoque/' + idRequisicao;

    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    
    if(!response.ok){
        alert("Falha no banco de dados!");
    }

    return response.text();
}