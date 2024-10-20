export async function listarItensComboBox(categoria){

    let url = 'http://localhost:8080/users/listarPorCategoria';

    // Se a categoria estiver definida, adiciona como parâmetro
    if (categoria != undefined && categoria != null) {
        url += `?setor=${categoria}`;
    }

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