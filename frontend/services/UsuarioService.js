export async function listarUsuarios(){

    const url = 'http://localhost:8080/users/listar';

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

export async function cadastrarUsuario(dadosUsuario){

    const url = 'http://localhost:8080/users/cadastrar';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    })
    
    if(!response.ok){
        alert("Falha no banco de dados!");
    }

    return response.text();
}

export async function atualizarUsuario(id, dadosUsuario){

    const url = 'http://localhost:8080/users/atualizar/' + id;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    })
    
    if(!response.ok){
        alert("Falha no banco de dados!");
    }

    return response.text();
}

export async function procurarSetorNome(nome){

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

export async function inativarUsuarios(id){

    const url = 'http://localhost:8080/users/inativar/' + id;

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