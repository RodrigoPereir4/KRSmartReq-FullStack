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

function createData(id, name, calories, fat, carbs, protein) {
    return { id, name, calories, fat, carbs, protein };
}

export function useRequisicao(){
    const [rows, setRows] = useState([]);
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');

    const handleAddRow = () => {
        if(verificarAtributosNullos()){
            const newRow = createData(
                rows.length + 1,
                name,
                Number(calories),
                Number(fat),
                Number(carbs),
                Number(protein)
            );

            setRows((prevRows) => [...prevRows, newRow]);
        }else{
            alert("Preencha os campos necessários!"); //TODO: Adicionar alert personalizado
        }

        // Limpa os campos após adicionar
        setName('');
        setCalories('');
        setFat('');
        setCarbs('');
        setProtein('');
    };

    const verificarAtributosNullos = () =>{
        const atributosParaVerificar = [name, calories, fat, carbs, protein];
        const test = !atributosParaVerificar.some(attr => attr === '');

        return test;
    }

    const handleDeleteRow = (selected) => {
        setRows((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCaloriesChange = (e) => {
        setCalories(e.target.value);
    };

    const handleFatChange = (e) => {
        setFat(e.target.value);
    };

    const handleCarbsChange = (e) => {
        setCarbs(e.target.value);
    };

    const handleProteinChange = (e) => {
        setProtein(e.target.value);
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
        name,
        setName,
        calories,
        setCalories,
        fat,
        setFat,
        carbs,
        setCarbs,
        protein,
        setProtein,
        handleAddRow,
        verificarAtributosNullos,
        handleDeleteRow,
        handleNameChange,
        handleCaloriesChange,
        handleFatChange,
        handleCarbsChange,
        handleProteinChange,
        handleSubmit
    };    
}