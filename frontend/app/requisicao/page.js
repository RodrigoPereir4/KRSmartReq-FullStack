'use client'

import styled from "styled-components"

import EnhancedTable from "@/components/MUI/Tabela";
import { useEffect, useState } from "react";
import { useRequisicao } from "@/hooks/useRequisicao";
import { listarItensComboBox } from "@/services/RequisicaoService";
import ComboBox from "@/components/MUI/ComboBox";
import { DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import Navbar from "@/components/sideBar/Navbar";

import Image from "next/image";
import userImage from "@/images/user2.png";
import { TextField, InputAdornment } from "@mui/material";
import BotaoPersonalizado from "@/components/generics/BotaoPersonalizado";



export default function Requisicao(){

    const [produto, setProduto] = useState('');
    const [inputProductValue, setInputProductValue] = useState('');

    const handleProductValueChange = (event, newValue) => {
        setProduto(newValue);
        if(newValue != null){
          alert(newValue);
        }
    };
    
    const handleInputProductValueChange = (event, newInputValue) => {
        setInputProductValue(newInputValue);
    };

    const [categoria, setCategoria] = useState('');
    const [inputCategoriaValue, setInputCategoriaValue] = useState('');

    const handleCategoriaValueChange = (event, newValue) => { 
        setCategoria(newValue);
        if(newValue != null){
            alert(newValue);
          }
    };

    const handleInputCategoriaValueChange = (event, newInputValue) => {
        setInputCategoriaValue(newInputValue);
    };

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

    function testListarItensCategoria(){
        return ['2', '3'];
    }

    //DATE PICKER ---------------------------------
    const [dataInicio, setDataInicio] = useState(null);
    const [dataEntrega, setDataEntrega] = useState(null);

    const handleDataInicioChange = (newValue) => {
        setDataInicio(newValue);
    }

    const handleDataEntregaChange = (newValue) => {
        if(newValue.isBefore(dataInicio)){
            setDataInicio(newValue);
            alert("Selecione uma data de entrega válida! Depois ou igual a inicial.")
        } else{
            setDataEntrega(newValue);
        }
    }

    const formatDate = (date) => {
      if (!date) return '';
      return format(date, 'dd/MM/yyyy'); // Formata a data
    };

    return(
        <div style={{display:"flex"}}>
            <Navbar/>
            <div>
                <div style={{display:"flex", justifyContent:"center", gap:25, marginTop: 85, marginBottom:50}}>
                    <Image src={userImage}/>
                    <h1>Realizar Requisição</h1>
                </div>
                <form onSubmit={handleSubmit} style={{display:"flex", flexWrap:"wrap"}}>
 
                    <div>
                        <TextField
                            value={name} 
                            onChange={handleNameChange}  
                            label="Nome"
                            error
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker 
                                label="Data de Inicio" 
                                value={dataInicio}
                                onChange={handleDataInicioChange}
                                slotProps={{
                                    textField: {
                                    helperText: 'DD/MM/YYYY',
                                    },
                                }}
                            />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker 
                                label="Data de Entrega" 
                                value={dataEntrega}
                                onChange={handleDataEntregaChange}
                                slotProps={{
                                    textField: {
                                    helperText: 'DD/MM/YYYY',
                                    },
                                }}
                            />
                        </LocalizationProvider>
        
                    </div>
                    

                    <div>
                        <ComboBox 
                            listarItens={testListarItensCategoria} 
                            value={categoria} 
                            inputValue={inputCategoriaValue} 
                            handleValueChange={handleCategoriaValueChange} 
                            handleInputValueChange={handleInputCategoriaValueChange} 
                        />

                        <TextField style={{margin: 0+"px"}}
                            label="Quantidade"
                            type="number"
                            sx={{ m: 1, width: '25ch' }}
                            slotProps={{
                                input: {
                                startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                },
                            }}
                        />
                    </div>
                    
                    <div>
                        <ComboBox 
                            listarItens={listarItensComboBox} 
                            value={produto} 
                            inputValue={inputProductValue} 
                            categoria={categoria}
                            handleValueChange={handleProductValueChange} 
                            handleInputValueChange={handleInputProductValueChange}
                        />

                        <BotaoPersonalizado onClick={handleAddRow} text="Adicionar Linha" color="amarelo"/>
                    </div>

                    <EnhancedTable tableHeader={tableHeader} rows={rows} onDeleteRow={handleDeleteRow}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}