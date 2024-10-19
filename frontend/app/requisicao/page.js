'use client'

import styled from "styled-components"

import EnhancedTable from "@/components/MUI/Tabela";
import { useState } from "react";

const tableHeader = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Dessert (100g serving)',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Calories',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Fat (g)',
    },
    {
      id: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'Carbs (g)',
    },
    {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)',
    },
];


function createData(id, name, calories, fat, carbs, protein) {
    return { id, name, calories, fat, carbs, protein };
}

export default function Requisicao(){
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
            alert("Preencha os campos necessários!"); //TODO: Alert personalizado
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

    return(
        <>
            <form onSubmit={handleSubmit}>
                <button type="button" onClick={handleAddRow}>Adicionar LinhaAAAA</button>

                <label>Nome</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={handleNameChange}  
                />
                
                <label>Calorias</label>
                <input 
                    type="number" 
                    value={calories} 
                    onChange={handleCaloriesChange}  
                />

                <label>Gordura (g)</label>
                <input 
                    type="number" 
                    value={fat} 
                    onChange={handleFatChange}  
                />

                <label>Carboidratos (g)</label>
                <input 
                    type="number" 
                    value={carbs} 
                    onChange={handleCarbsChange}  
                />

                <label>Proteínas (g)</label>
                <input 
                    type="number" 
                    value={protein} 
                    onChange={handleProteinChange}  
                />
           
                <EnhancedTable tableHeader={tableHeader} rows={rows} onDeleteRow={handleDeleteRow}/>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}