export async function loginUsuario(dadosUsuario){

    const response = await fetch("http://localhost:8080/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    })

    if(!response.ok){
        alert("Falha na requisição!");
    }

    return response.text();
}