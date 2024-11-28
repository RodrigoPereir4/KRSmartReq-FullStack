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