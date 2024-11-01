export async function listarItensComboBox(categoria){

    let url = 'http://localhost:8080/produto/listarNome';

    // Se a categoria estiver definida, adiciona como parâmetro 
    if (categoria != undefined && categoria != null) {
        url += `?category=${categoria}`;
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

export async function procurarProdutoNome(nome){

    nome = nome.replace(/%/g, "%25");
    console.log(nome);

    let url = `http://localhost:8080/produto/procurarNome?nome=${nome}`;

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