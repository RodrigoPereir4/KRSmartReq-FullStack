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

const Container = styled.div`

`

const InputContainer = styled.div`
    display: flex;
    gap: 18px;
    margin-bottom: 20px;

    &:first-child {
        margin-bottom: 10px;
    }

    #nome-input{
        width: 320px;
    }
`

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

    //TEST MUDANDO TABELA
    const param = ['name', 'calories', 'fat', 'carbs'];

    return(
        <div style={{display:"flex"}}>
            <Navbar/>
            <div style={{padding: 20}}>
                <div style={{display:"flex", justifyContent:"center", gap:25, marginTop: 85, marginBottom:50}}>
                    <Image src={userImage}/>
                    <h1>Realizar Requisição</h1>
                </div>
                <form onSubmit={handleSubmit} style={{display:"flex", flexWrap:"wrap", maxWidth:650}}>
 
                    <InputContainer>
                        <TextField
                            id="nome-input"
                            value={name} 
                            onChange={handleNameChange}  
                            label="Nome"
                            error
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                <DatePicker 
                                    id="data-inicio"
                                    label="Data de Inicio" 
                                    value={dataInicio}
                                    onChange={handleDataInicioChange}
                                    slotProps={{
                                        textField: {
                                        helperText: 'DD/MM/AAAA',
                                        },
                                    }}
                                />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                            <DatePicker 
                                id="data-entrega"
                                label="Data de Entrega" 
                                value={dataEntrega}
                                onChange={handleDataEntregaChange}
                                slotProps={{
                                    textField: {
                                    helperText: 'DD/MM/AAAA',
                                    },
                                }}
                            />
                        </LocalizationProvider>
        
                    </InputContainer>
                    

                    <InputContainer>
                       
                        <ComboBox 
                            sx={{ width: 255 }}
                            label="Categoria"
                            listarItens={testListarItensCategoria} 
                            value={categoria} 
                            inputValue={inputCategoriaValue} 
                            handleValueChange={handleCategoriaValueChange} 
                            handleInputValueChange={handleInputCategoriaValueChange} 
                        />

                        <TextField style={{margin: 0+"px"}}
                            sx={{ width: 378 }}
                            label="Quantidade"
                            type="number"
                            slotProps={{
                                input: {
                                startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                },
                            }}
                        />
                    </InputContainer>
                    
                    <InputContainer style={{alignItems: "center"}}>
                        <ComboBox 
                            sx={{ width: 482}}
                            label="Itens"
                            listarItens={listarItensComboBox} 
                            value={produto} 
                            inputValue={inputProductValue} 
                            categoria={categoria}
                            handleValueChange={handleProductValueChange} 
                            handleInputValueChange={handleInputProductValueChange}
                        />

                        <BotaoPersonalizado type="button" onClick={handleAddRow} text="Adicionar Linha" color="amarelo"/>
                    </InputContainer>

                    <EnhancedTable title="Produtos Requisitados" parameters={param} tableHeader={tableHeader} rows={rows} onDeleteRow={handleDeleteRow}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}