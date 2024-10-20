export async function listarItensComboBox(){

    const response = await fetch("http://localhost:8080/users/listarEmail", {
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