'use client'

import { useState } from "react";

const tableHeader = [
    {
      id: 'nome',
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

function createData(id, nome, dataSolicitada, dataEntrega, categoria, quantidade, item) {
    return { id, nome, dataSolicitada, dataEntrega, categoria, quantidade, item };
}

export function useRequisicao(){
    const [rows, setRows] = useState([]);
    const [nome, setNome] = useState('');
    const [dataSolicitada, setDataSolicitada] = useState(null);
    const [dataEntrega, setDataEntrega] = useState(null);
    const [quantidade, setQuantidade] = useState('');

    const [categoria, setCategoria] = useState('');
    const [inputCategoriaValue, setInputCategoriaValue] = useState('');
    
    const [item, setItem] = useState('');
    const [inputItemValue, setInputItemValue] = useState('');

    const [erros, setErros] = useState([]);
    const [preenchidos, setPreenchidos] = useState([]);

    const handleAddRow = () => {
        if(verificarAtributosNullos()){
            const newRow = createData(
                rows.length + 1,
                nome,
                dataSolicitada.format('DD/MM/YYYY'),
                dataEntrega.format('DD/MM/YYYY'),
                categoria,
                Number(quantidade),
                item
            );

            setRows((prevRows) => [...prevRows, newRow]);

            // Limpa os campos após adicionar
            setDataSolicitada(null);
            setDataEntrega(null);
            setCategoria('');
            setQuantidade('');
            setItem('');
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
            { valor: item, campo: 'Item' },
        ];
    
        const novosErros = [];
        const camposPreenchidos = [];
    
        atributosParaVerificar.forEach(attr => {
            if (attr.valor === '' || attr.valor === null) {
                novosErros.push(attr.campo); // Chame a função para setar o erro
            } else {
                camposPreenchidos.push(attr.campo);
            }
        });

        setErros(novosErros);
        setPreenchidos(camposPreenchidos);
        console.log(erros);
        console.log(camposPreenchidos);
    
        return novosErros === 0; // Retorna true se não houver erros
    }

    const handleDeleteRow = (selected) => {
        setRows((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));
    };

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

    const handleDataSolicitadaChange = (newValue) => {
        setDataSolicitada(newValue);
    }

    const handleDataEntregaChange = (newValue) => {
        if(newValue.isBefore(dataSolicitada)){
            setDataSolicitada(newValue);
            alert("Selecione uma data de entrega válida! Depois ou igual a inicial.")
        } else{
            setDataEntrega(newValue);
        }
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

    const handleItemValueChange = (event, newValue) => {
        setItem(newValue);
        if(newValue != null){
          alert(newValue);
        }
    };
    
    const handleInputItemValueChange = (event, newInputValue) => {
        setInputItemValue(newInputValue);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if(rows.length==0){
            alert("ERRO! Insira algum item para realizar a requisição"); //TODO: Adicionar alert personalizado
        } else {
            console.log('Submitting data:', rows);
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
        quantidade,
        setQuantidade,
        item,
        setItem,
        inputItemValue,
        setInputItemValue,
        handleAddRow,
        verificarAtributosNullos,
        handleDeleteRow,
        handleNomeChange,
        handleDataSolicitadaChange,
        handleDataEntregaChange,
        handleQuantidadeChange,
        handleCategoriaValueChange,
        handleInputCategoriaValueChange,
        handleItemValueChange,
        handleInputItemValueChange,
        handleSubmit,
        erros, 
        setErros,
        preenchidos, 
        setPreenchidos
    };    
}