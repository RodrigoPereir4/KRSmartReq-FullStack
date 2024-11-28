'use client'

import { enviarRequisicao, procurarProdutoNome } from "@/services/RequisicaoService";
import dayjs from "dayjs";
import { useState } from "react";

const tableHeader = [
    {
      id: 'nomeProduto',
      numeric: false,
      disablePadding: true,
      label: 'Nome do Produto',
    },
    {
        id: 'categoria',
        numeric: false,
        disablePadding: false,
        label: 'Categoria',
    },
    {
      id: 'quantidade',
      numeric: true,
      disablePadding: false,
      label: 'Quantidade',
    },
    {
      id: 'dataSolicitada',
      numeric: false,
      disablePadding: false,
      label: 'Data Solicitada',
    },
    {
      id: 'dataEntrega',
      numeric: true,
      disablePadding: false,
      label: 'Data de Entrega',
    },
];

function createData(id, nome, categoria, quantidade, dataSolicitada, dataEntrega, nomeProduto, itemObj) {
    return { id, nomeProduto, nome, categoria, quantidade, dataSolicitada, dataEntrega, itemObj };
}

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

export function useRequisicao(){
    const [rows, setRows] = useState([]);

    const [nome, setNome] = useState('');
    const [dataSolicitada, setDataSolicitada] = useState(today);
    const [dataEntrega, setDataEntrega] = useState(tomorrow);
    const [quantidade, setQuantidade] = useState('');

    const [categoria, setCategoria] = useState('');
    const [inputCategoriaValue, setInputCategoriaValue] = useState('');

    const [listaCategorias, setListaCategorias] = useState('');
    
    const [nomeProduto, setNomeProduto] = useState('');
    const [inputNomeProdutoValue, setInputNomeProdutoValue] = useState('');

    const [erros, setErros] = useState([]);
    const [visibilityDense, setVisibilityDense] = useState(true);

    const handleAddRow = async () => {
        if(verificarAtributosNullos()){
            const response = await procurarProdutoNome(nomeProduto);
            const newRow = createData(
                rows.length + 1,
                nome,
                categoria,
                Number(quantidade),
                dataSolicitada.format('DD/MM/YYYY'),
                dataEntrega.format('DD/MM/YYYY'),
                nomeProduto,
                response
            );
            console.log(newRow);

            setRows((prevRows) => [...prevRows, newRow]);

            // Limpa os campos após adicionar
            setDataSolicitada(dataSolicitada);
            setDataEntrega(dataEntrega);
            setCategoria('');
            setQuantidade('');
            setNomeProduto('');
        }else{
            alert("Preencha os campos necessários!"); //TODO: Adicionar alert personalizado
        }
    };

    const verificarAtributosNullos = () =>{
        const atributosParaVerificar = [
            { valor: nome, campo: 'Nome' },
            { valor: dataSolicitada, campo: 'Data Solicitada' },
            { valor: dataEntrega, campo: 'Data de Entrega' },
            { valor: categoria, campo: 'Categoria' },
            { valor: quantidade, campo: 'Quantidade' },
            { valor: nomeProduto, campo: 'Nome Produto' },
        ];
    
        const novosErros = [];
    
        atributosParaVerificar.forEach(attr => {
            if (attr.valor === '' || attr.valor === null) {
                novosErros.push(attr.campo); // Chame a função para setar o erro
            }
        });

        setErros(novosErros);
        console.log(erros);
    
        return novosErros.length === 0; // Retorna true se não houver erros
    }

    const handleDeleteRow = (selected) => {
        setRows((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));
    };

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

    const handleDataSolicitadaChange = (newValue) => {
        setDataSolicitada(newValue);
        console.log(newValue);
    }

    const handleDataEntregaChange = (newValue) => {
        if(newValue.isBefore(dataSolicitada)){
            setDataSolicitada(newValue);
            alert("Selecione uma data de entrega válida! Depois ou igual a inicial.")
        } else{
            setDataEntrega(newValue);
            console.log(newValue);
        }
        console.log(newValue);
    }

    const handleQuantidadeChange = (e) => {
        setQuantidade(e.target.value);
    };

    const handleCategoriaValueChange = (event, newValue) => { 
        setCategoria(newValue);
        if(newValue != null){
            alert(newValue);
          }
    };

    const handleInputCategoriaValueChange = (event, newInputValue) => {
        setInputCategoriaValue(newInputValue);
    };

    const handleNomeProdutoValueChange = (event, newValue) => {
        setNomeProduto(newValue);
        if(newValue != null){
          alert(newValue);
        }
    };
    
    const handleInputNomeProdutoValueChange = (event, newInputValue) => {
        setInputNomeProdutoValue(newInputValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(rows.length==0){
            alert("ERRO! Insira algum Produto para realizar a requisição"); //TODO: Adicionar alert personalizado
        } else {
            console.log('Submitting data:', rows);

            const rowsFiltradas = {

                solicitante: nome,
                dataSolicitada,
                dataEntrega,
                itens: rows.flatMap((row) => {
                    return {
                        produto: {
                            sku: row.itemObj.sku
                        },
                        quantidade: row.quantidade
                    }
                })
            }
            
            console.log('Rows Filtradas');
            console.log(rowsFiltradas);

            try{
                const response = await enviarRequisicao(rowsFiltradas);

                if(response !== "Requisição gerada com sucesso!"){
                    alert("Problema no envio!");
                } else {
                    alert(response);
                }
                
            }catch(error){
                alert(error);
                alert("Erro de comunicação com o servidor!");
            }

            
            //'nome, dataS, dataE, SKU, quantidade'
        }
        // Aqui você pode enviar os dados para um servidor ou fazer outra ação
    };

    //Não retorno o createData porque utilizo apenas aqui
    return {
        tableHeader,
        rows,
        setRows,
        nome,
        setNome,
        dataSolicitada,
        setDataSolicitada,
        dataEntrega,
        setDataEntrega,
        categoria,
        setCategoria,
        inputCategoriaValue,
        setInputCategoriaValue,
        listaCategorias, 
        setListaCategorias,
        quantidade,
        setQuantidade,
        nomeProduto,
        setNomeProduto,
        inputNomeProdutoValue,
        setInputNomeProdutoValue,
        erros, 
        setErros,
        visibilityDense,
        setVisibilityDense,
        handleAddRow,
        verificarAtributosNullos,
        handleDeleteRow,
        handleNomeChange,
        handleDataSolicitadaChange,
        handleDataEntregaChange,
        handleQuantidadeChange,
        handleCategoriaValueChange,
        handleInputCategoriaValueChange,
        handleNomeProdutoValueChange,
        handleInputNomeProdutoValueChange,
        handleSubmit
    };    
}