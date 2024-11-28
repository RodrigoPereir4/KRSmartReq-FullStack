export async function pesquisarData(dataInicio, dataFim){

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Formatar as datas de entrada
    const dataInicioFormatada = formatDate(dataInicio);
    const dataFimFormatada = formatDate(dataFim);

    // A URL agora inclui os parâmetros dataInicio e dataFim
    const url = `http://localhost:8080/relatorio/listar?dataInicio=${dataInicioFormatada}&dataFim=${dataFimFormatada}`;

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