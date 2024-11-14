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
import Tabela from "@/components/MUI/Tabela";

const Container = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'activateBodyHamburguer' // Não passar a prop 'activateBodyHamburguer' para o DOM
})`
    height: 100vh;
    margin: auto;

    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    pointer-events: ${(props) => (props.activateBodyHamburguer ? 'none' : 'auto')};

    .inputNome{
        width: 60%;
    }

    .inputQuantidade{
        width: 50%;
    }
        

    @media (max-width: 1250px){
        margin: 4rem auto;
    }

    @media (max-width: 690px) {
        .inputNome{
            width: 100%;
        }

        .inputQuantidade{
            width: 50%;
        }
    }

    @media (max-width: 400px){
        margin: 4.5rem auto;
    }

`

const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;

    display: flex;
    justify-content: space-between;
    gap: 18px;

    #nome-input{
        width: 320px;
    }

    @media(min-width: )

    &:first-child {
        margin-bottom: 10px;

        @media (max-width: 690px) {
            flex-wrap: wrap;
        }
    }

    @media (max-width: 500px){
        flex-wrap: wrap;
    }
    
`

const FormInput = styled.form`
    display: flex;
    flex-wrap: wrap; 
    max-width: 1000px;

    @media (max-width: 1200px){
        max-width: 850px;
    } 

    @media (max-width: 800px){
        max-width: 450px;
    } 

    @media (max-width: 500px){
        max-width: 350px;

        .inputQuantidade{
            width: 100%;
        }
    }
`

export default function Requisicao(){

    const {
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
        item,
        setItem,
        inputItemValue,
        setInputItemValue,
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
        handleItemValueChange,
        handleInputItemValueChange,
        handleSubmit
    } = useRequisicao();

    useEffect(() => {
        const carregarCategoria = async() => {
            try{
                const response = await fetch('http://localhost:8080/produto/listarCategoria', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
    
                if(!response.ok){
                    alert("Falha no banco de dados!")
                    return;
                } 
    
                const result = await response.json();
                setListaCategorias(result);
            }catch(error){
                alert("Erro ao carregar as categorias: " + error.message);
            }
        };
        carregarCategoria();
    }, []);

    /*
    //PRODUTO --------------------------------- 
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

    //CATEGORIA ---------------------------------
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

    //DATE PICKER ---------------------------------
    
    const [dataSolicitada, setDataSolicitada] = useState(null);
    const [dataEntrega, setDataEntrega] = useState(null);

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
    */

    //HAMBURGUER
    const [activateBodyHamburguer, setActivateBodyHamburguer] = useState(false);
    
    const handleActivateBodyHamburguer = () => {
        setActivateBodyHamburguer((prev) => !prev);
    };

    //TEST MUDANDO TABELA
    const param = ['name', 'calories', 'fat', 'carbs'];

    return(
        <div style={{display:"flex", background: activateBodyHamburguer ? 'rgba(0,0,0,0.7)' : '#ffffff'}}>
            <Navbar onToggleBody={handleActivateBodyHamburguer}/>
            <Container activateBodyHamburguer={activateBodyHamburguer}>
                <div style={{display:"flex", justifyContent:"center", gap:25, marginBottom:30}}>
                    <Image src={userImage}/>
                    <h1>Realizar Requisição</h1>
                </div>
                <FormInput onSubmit={handleSubmit}>
 
                    <InputContainer>
                        <TextField className="inputNome" style={{margin: 0+"px"}}
                            id="nome-input"
                            value={nome} 
                            onChange={handleNomeChange}  
                            label="Nome"

                            error={erros.includes('Nome')}
                        />

                        <LocalizationProvider 
                            dateAdapter={AdapterDayjs} 
                            adapterLocale="en-gb"
                            className="inputData">
                                <DatePicker 
                                    id="data-solicitada"
                                    label="Data Solicitada" 
                                    value={dataSolicitada}
                                    onChange={handleDataSolicitadaChange}
                                    slotProps={{
                                        textField: {
                                        helperText: 'DD/MM/AAAA',
                                        },
                                    }}
                                    sx={{
                                        width: { xs: '100%', sm: '48%', md: '20%' }
                                    }}
                                />
                        </LocalizationProvider>

                        <LocalizationProvider 
                            dateAdapter={AdapterDayjs} 
                            adapterLocale="en-gb"
                            className="inputData">
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
                                    sx={{
                                        width: { xs: '100%', sm: '48%', md: '20%' }
                                    }}
                                />
                        </LocalizationProvider>
        
                    </InputContainer>
                    

                    <InputContainer>
                       
                        <ComboBox 
                            sx={{ 
                                width: { xs: '100%', sm: '50%', md: '57.5%' },
                                border: erros.includes('Categoria') ? '1px solid red' : "1px solid rgba(0, 0, 0, 0.23)",
                                borderRadius: 1,

                               '& .MuiOutlinedInput-root': {
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: erros.includes('Categoria') ? '2px solid red' : "2px solid #9c27b0",
                                    span: {
                                        color: erros.includes('Categoria') ? 'red' : "#9c27b0"
                                    }
                                },
                            },
                            }}
                            label="Categoria"
                            className="inputCategoria"
                            listarItens={listaCategorias} 
                            value={categoria} 
                            inputValue={inputCategoriaValue} 
                            handleValueChange={handleCategoriaValueChange} 
                            handleInputValueChange={handleInputCategoriaValueChange} 
                        />

                        <TextField className="inputQuantidade" style={{margin: 0+"px"}}
                            sx={{ 
                                width: 378,
                                border: erros.includes('Quantidade') ? '1px solid red' : "1px solid rgba(0, 0, 0, 0.23)",
                                borderRadius: 1
                            }}
                            value={quantidade}
                            label="Quantidade"
                            type="number"
                            onChange={handleQuantidadeChange}
                            slotProps={{
                                input: {
                                startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                },
                            }}
                            color={erros.includes('Quantidade') ? 'error' : 'secondary'}
                        />
                    </InputContainer>
                    
                    <InputContainer style={{alignItems: "center"}}>
                        <ComboBox 
                            sx={{ 
                                width: { xs: '100%', sm: '75%', md: '85%' },
                                border: erros.includes('Item') ? '1px solid red' : "1px solid rgba(0, 0, 0, 0.23)",
                                borderRadius: 1,

                               '& .MuiOutlinedInput-root': {
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: erros.includes('Item') ? '2px solid red' : "2px solid #9c27b0",
                                    span: {
                                        color: erros.includes('Item') ? 'red' : "#9c27b0"
                                    }
                                },
                            },
                            }}
                            label="Itens"
                            className="inputData"
                            listarItens={listarItensComboBox} 
                            value={item} 
                            inputValue={inputItemValue} 
                            categoria={categoria}
                            handleValueChange={handleItemValueChange} 
                            handleInputValueChange={handleInputItemValueChange}
                        />

                        <BotaoPersonalizado type="button" onClick={handleAddRow} text="Adicionar Linha" color="amarelo"/>
                    </InputContainer>

                        <Tabela 
                            title="Produtos Requisitados" 
                            parameters={param} 
                            tableHeader={tableHeader} 
                            rows={rows} 
                            onDeleteRow={handleDeleteRow}
                            fontHeader={12}
                            visibilityDense={visibilityDense}
                            activateBodyHamburguer = {activateBodyHamburguer}
                            />
                    <BotaoPersonalizado type="submit" text="Enviar" color="amarelo"/>
                </FormInput>
            </Container>
        </div>
    );
}