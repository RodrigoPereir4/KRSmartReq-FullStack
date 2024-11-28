'use client'

import BotaoPersonalizado from "@/components/generics/BotaoPersonalizado";
import ComboBox from "@/components/MUI/ComboBox";
import ObservacaoDialog from "@/components/MUI/ObservacaoDialog";
import Tabela from "@/components/MUI/Tabela";
import Navbar from "@/components/sideBar/Navbar";
import { enviarEntrega, listarNumRequisicao, listarSetores } from "@/services/EstoqueService";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Image from "next/image";
import reload from "@/images/reload.svg";
import reloadStatic from "@/images/reloadStatic.svg";
import styled from "styled-components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { pesquisarData } from "@/services/RelatorioService";

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

const tableHeaderEntregas = [
      {
        id: 'requisicaoId',
        numeric: true,
        disablePadding: false,
        label: 'Requisição ID',
      },
      {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'Entrega ID',
      },
      {
        id: 'solicitante',
        numeric: false,
        disablePadding: false,
        label: 'Solicitante',
      },
      {
        id: 'dataSolicitada',
        numeric: true,
        disablePadding: false,
        label: 'Data Solicitada',
      },
      {
        id: 'dataEntrega',
        numeric: true,
        disablePadding: false,
        label: 'Data Entregue',
      },
      
];

const tableHeaderItens = [
      {
        id: 'nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
      },
      {
        id: 'unMedida',
        numeric: false,
        disablePadding: false,
        label: 'Unidade de Medida',
      },
      {
        id: 'quantidadeSolicitada',
        numeric: true,
        disablePadding: false,
        label: 'Quantidade',
      },
      {
        id: 'quantidadeEntregue',
        numeric: true,
        disablePadding: false,
        label: 'Quantidade',
      },
      {
        id: 'observacao',
        numeric: false,
        disablePadding: false,
        label: 'Observação',
      },
      {
        id: 'sku',
        numeric: true,
        disablePadding: false,
        label: 'SKU',
      },
];

const tableHeaderItensEnviar = [
    {
        id: 'nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
    },
    {
      id: 'quantidade',
      numeric: false,
      disablePadding: false,
      label: 'Quantidade',
    },
    {
      id: 'observacao',
      numeric: false,
      disablePadding: false,
      label: 'Observação',
    },
    {
        id: 'sku',
        numeric: true,
        disablePadding: false,
        label: 'SKU',
    },
];

const ContainerTabelas = styled.div`
    width: 100%;
    margin: 25px 60px 20px 40px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    align-items: center;
    gap: 20px;
`

const ContainerSetores = styled.div`
    display: flex;
    flex-direction: column;
`

const ContainerItens = styled.div`
    
`

const ContainerItensEnviados = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    margin-top: 20px;
`

export default function Relatorio(){
   
    const [dataSolicitada, setDataSolicitada] = useState(today);
    const [dataEntrega, setDataEntrega] = useState(tomorrow);

    const [rowsEntregas, setRowsEntregas] = useState([
    ]);

    const [rowsItens, setRowsItens] = useState([]);
    const [rowsItensEntregas, setRowsItensEntregas] = useState([]);
    
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowsRequisitadas, setSelectedRowsRequisitadas] = useState([]);
    const [quantidade, setQuantidade] = useState(0);
    const [observacao, setObservacao] = useState('');


    const [numRequisicao, setNumRequisicao] = useState('');

    const [resetSelect, setResetSelect] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    const [updateTablePressionado, setUpdateTablePressionado] = useState(false);


    const handleDeleteRowSetor = (selected) => {setRowsEntregas((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));};
   
    const handleDeleteRowItemEnviar = (selected) => {setRowsItensEntregas((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));};

    const handleSelected = (selected) =>{
        const newRow = Array.isArray(selected)
        ? rowsEntregas.filter((row) => selected.includes(row.id))  // Seleção múltipla
        : rowsEntregas.filter((row) => row.id === selected);  // Seleção única

        setSelectedRows(newRow);
    }

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

    const handlePesquisarData = async () => {
        const response = await pesquisarData(dataSolicitada, dataEntrega);

        if(response.length > 0){
            const rowFiltrada = response.map(item => ({
                requisicaoId: item.requisicaoId.requisicaoId,
                id: item.id,
                solicitante: item.solicitante,
                dataSolicitada: item.dataSolicitada,
                dataEntrega: item.dataEntrega
            }));
    
            setRowsEntregas(rowFiltrada);
        } else {
            alert("Nenhum item encontrado nessa data!");
            handleUpdateTable();
        }
    }

    useEffect(() => {
        console.log("selectedRows atualizado:", selectedRows);

        if(selectedRows.length > 0) {
            const carregarNumRequisicao = async(id) => {
                try{
                    const url = 'http://localhost:8080/requisicao/listaRelatorioItem/' + id;
                
                    const response = await fetch(url, {
                        method: 'GET',
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    
                    if(!response.ok){
                        alert("Falha no banco de dados!");
                    }

                    const result = await response.json();

                    const updatedRows = result.map((prevRow, index) => ({
                        id: index + 1,   
                        ...prevRow
                    }));
                    
                    setRowsItensEntregas(updatedRows);
                    
                }catch(error){
                    alert("Erro ao carregar os números das requisições!: " + error.message);
                }
            }
    
            carregarNumRequisicao(selectedRows[0].requisicaoId);
        }
    }, [selectedRows]);

    useEffect(() => {
        console.log("selectedRowsRequisitadas atualizado:", selectedRowsRequisitadas);

    }, [selectedRowsRequisitadas]);
    
    useEffect(() => {
        console.log("Observacao atualizado:", observacao);

        setRowsItensEntregas(prevRows => 
            prevRows.map(row => ({
                ...row, 
                observacao: observacao
            }))
        );
    }, [observacao]);

    
    useEffect(() => {
        console.log('NumRequisicao:', numRequisicao);
        if(numRequisicao !== ''){
            const carregarItensRequisitados = async(idRequisicao) => {

                try{
    
                    const url = "http://localhost:8080/estoque/itemRequisitado/" + idRequisicao;
    
                    const response = await fetch(url, {
                        method: 'GET',
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    
                    if(!response.ok){
                        alert("Falha no banco de dados!");
                    }
    
                    const result = await response.json();

                    result.forEach(row => {

                        setRowsItens(prevRows => [
                            ...prevRows,
                            {
                                id: prevRows.length,
                                ...row,
                            }
                        ]);
        
                    });
    
                }catch(error){
                    alert("Erro ao carregar os itens da requisição! " + error.message);
                }
                
            }
            carregarItensRequisitados(numRequisicao);
        }
    }, [numRequisicao])

    //UPDATE
    useEffect(() => {
        const fetchData = async() =>{
            const response = await listarSetores();
            
            setRowsEntregas([]);

            response.forEach(row => {

                setRowsEntregas(prevRows => [
                    ...prevRows,
                    {
                        id: prevRows.length,
                        ...row,
                        situacao: row.situacao ? "Pendente" : "Entregue"
                    }
                ]);

            });
        }
        fetchData();
    }, [])

    const handleUpdateTable = () => {
        setUpdateTable(!updateTable);

        setUpdateTablePressionado(true);
        setResetSelect(!resetSelect)

        setTimeout(() => {
            setUpdateTablePressionado(false);
        }, 2000)
    }

    useEffect(() => {
        const fetchData = async() =>{
            const response = await listarSetores();
            
            setRowsEntregas([]);
            setRowsItens([]);
            setRowsItensEntregas([]);
            setNumRequisicao('');
            setQuantidade(0);

            response.forEach(row => {
                setRowsEntregas(prevRows => [
                    ...prevRows,
                    {
                        id: prevRows.length,
                        ...row,
                        situacao: row.situacao ? "Pendente" : "Entregue"
                    }
                ]);
            });
        }
        fetchData();
    }, [updateTable])


    const handleSendItem = () => {
        if (selectedRowsRequisitadas.length > 0) {
            let testQtd = false;
            selectedRowsRequisitadas.forEach((row) =>{
                testQtd = quantidade == row.quantidade;
                console.log(row.quantidade);
                console.log(testQtd);
                console.log(quantidade);
            });
            if(testQtd){
                const updatedRows = selectedRowsRequisitadas.map(row => ({
                    ...row,
                    quantidade,
                    observacao: observacao
                }));
            
                updatedRows.forEach(updatedRow => {
                    const index = rowsItensEntregas.findIndex(row => row.id === updatedRow.id);
            
                    if (index !== -1) {
                        setRowsItensEntregas(prevRows => 
                            prevRows.map(row =>
                                row.id === updatedRow.id ? { ...row, quantidade, observacao } : row
                            )
                        );
                    } else {
                        // Se o item não existir, adiciona ele com os campos quantidade e observacao
                        setRowsItensEntregas(prevRows => [...prevRows, { ...updatedRow, quantidade, observacao}]);
                    }
                });
            } else {
                setOpenDialog(true);
            }

        } else {
            alert("Selecione um item requisitado para enviar");
        }
    }

    const handleConfirm = async () => {
        if(rowsItensEntregas.length !== 0){
            console.log(rowsItensEntregas);

            const rowsFiltradas = {

                observacao: observacao,
                itens: rowsItensEntregas.flatMap((row) => {
                    return {
                        produto: {
                            sku: row.sku
                        },
                        quantidade: row.quantidade
                    }
                })
            }
            
            console.log('Rows Filtradas', rowsFiltradas);

            console.log('Rows Filtradas', numRequisicao);

            try{
                const response = await enviarEntrega(numRequisicao, rowsFiltradas);

                if(response !== "Requisição finalizada!"){
                    alert("Problema no envio!");
                } else {
                    alert(response);
                }
                
            }catch(error){
                alert(error);
                alert("Erro de comunicação com o servidor!");
            }

            handleUpdateTable();
        }
    }

    const [activateBodyHamburguer, setActivateBodyHamburguer] = useState(false);

    console.log('Setores:',rowsEntregas);
    return(
        <div style={{display:'flex'}}>
            <Navbar/>
            <ContainerTabelas>
                <div>
                    <div style={{display: "flex", gap: 20, alignItems: 'flex-start', marginBottom: 20}}>
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

                        <div style={{display: 'flex', gap: 15, alignItems: 'center'}}>
                            <BotaoPersonalizado onClick={handlePesquisarData} text="Pesquisar" color="marrom"/>  

                            <button onClick={handleUpdateTable} 
                                style={{border: "none", backgroundColor: "#ffffff", cursor: "pointer"}}> 

                                {updateTablePressionado ? (<Image src={reload} alt="Botão para recarregar"/> )
                                : (<Image src={reloadStatic} alt="Botão para recarregar"/>)}
                            </button>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{display: "flex", gap: 30}}>
                            <Tabela
                                title="Requisições de Cada Setor" 
                                tableHeader={tableHeaderEntregas} 
                                rows={rowsEntregas} 
                                onDeleteRow={handleDeleteRowSetor}
                                fontHeader={12}
                                visibilityDense={false}
                                disableDelete={true}
                                disableHead={true}
                                activateBodyHamburguer = {activateBodyHamburguer}
                                resetSelect={resetSelect}
                                height={700}
                                updateSelect={handleSelected}
                            />
                        </div>
                    </div>
                </div>
                    
                    <div>
                        <div style={{maxWidth: '794px'}}>
                            <Tabela
                                title="Itens entregues" 
                                tableHeader={tableHeaderItens} 
                                rows={rowsItensEntregas} 
                                onDeleteRow={handleDeleteRowItemEnviar}
                                fontHeader={12}
                                visibilityDense={false}
                                activateBodyHamburguer = {activateBodyHamburguer}
                                resetSelect={resetSelect}
                                height={700}
                                updateSelect={handleSelected}
                            />
                        </div>
                    </div>
            </ContainerTabelas>
        </div>
    );
}