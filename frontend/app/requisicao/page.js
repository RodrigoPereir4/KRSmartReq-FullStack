'use client'

import styled from "styled-components"

import EnhancedTable from "@/components/MUI/Tabela";
import { useState } from "react";
import { useRequisicao } from "@/hooks/useRequisicao";

export default function Requisicao(){

    const {
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
    } = useRequisicao();

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