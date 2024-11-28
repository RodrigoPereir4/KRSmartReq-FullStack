'use client'



import BotaoPersonalizado from "@/components/generics/BotaoPersonalizado";
import ComboBox from "@/components/MUI/ComboBox";
import ObservacaoDialog from "@/components/MUI/ObservacaoDialog";
import Tabela from "@/components/MUI/Tabela";
import Navbar from "@/components/sideBar/Navbar";
import { listarSetores } from "@/services/EstoqueService";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "styled-components";

const tableHeaderSetores = [
      {
        id: 'setorId',
        numeric: true,
        disablePadding: false,
        label: 'ID Setor',
      },
      {
        id: 'setor',
        numeric: false,
        disablePadding: false,
        label: 'Setor',
      },
      {
        id: 'situacao',
        numeric: true,
        disablePadding: false,
        label: 'Situação',
      },
      {
        id: 'qtdRequisicao',
        numeric: true,
        disablePadding: false,
        label: 'Requisições',
      },
      
];

const tableHeaderItens = [
      {
        id: 'sku',
        numeric: false,
        disablePadding: false,
        label: 'SKU',
      },
      {
        id: 'produto',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
      },
      {
        id: 'medida',
        numeric: false,
        disablePadding: false,
        label: 'Unidade de Medida',
      },
      {
        id: 'quantidade',
        numeric: true,
        disablePadding: false,
        label: 'Quantidade',
      },
];

const tableHeaderItensEnviar = [
    {
        id: 'sku',
        numeric: false,
        disablePadding: false,
        label: 'SKU',
    },
    {
        id: 'produto',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
    },
    {
      id: 'medida',
      numeric: false,
      disablePadding: false,
      label: 'Unidade de Medida',
    },
    {
      id: 'quantidade',
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
];

const ContainerTabelas = styled.div`
    width: 100%;
    margin: 25px 40px 20px 40px;

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

export default function Estoque(){
   
    const [rowsSetores, setRowsSetores] = useState([
        {
            id: 1,
            idItem: 3,
            setor: 'cozinha',
            requisicoes: 3,
            situacao: 'Pendente'
        },
        {
            id: 2,
            idItem: 6,
            setor: 'café',
            requisicoes: 5,
            situacao: 'Pendente'
        },
        {
            id: 3,
            idItem: 1,
            setor: 'bar',
            requisicoes: 4,
            situacao: 'Normal'
        },
    ]);

    const [rowsItens, setRowsItens] = useState([
        {
            id: 1,
            idItem: '3333333KS',
            produto: 'Barra de chocolate ao leite',
            medida: 'kg',
            quantidade: 20
        },
        {
            id: 2,
            idItem: '333VVVV33KS',
            produto: 'Sorvete cream and Mulcream Dengo',
            medida: 'kg',
            quantidade: 10
        },
        {
            id: 3,
            idItem: '333VVV3333KS',
            produto: 'Copos de 300ml',
            medida: 'caixas',
            quantidade: 20
        },
        {
            id: 4,
            idItem: '33VV33333KS',
            produto: 'Barra de chocolate Branco',
            medida: 'kg',
            quantidade: 20
        },
        {
            id: 5,
            idItem: 'VVVADAWDWADAW',
            produto: 'Barra de chocolate Crocante',
            medida: 'kg',
            quantidade: 20
        },
    ]);

    const [rowsItensEnviar, setRowsItensEnviar] = useState([]);
    
    const [selectedRows, setSelectedRows] = useState([]);
    const [quantidade, setQuantidade] = useState(0);
    const [observacao, setObservacao] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const [updateTable, setUpdateTable] = useState(false);

    const handleQuantidadeChange = (e) => {
        setQuantidade(e.target.value);
    };

    const handleDeleteRowSetor = (selected) => {setRowsSetores((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));};
    const handleDeleteRowItem = (selected) => {setRowsItens((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));};
    const handleDeleteRowItemEnviar = (selected) => {setRowsItensEnviar((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));};

    const handleSelected = (selected) =>{
        const newRow = Array.isArray(selected)
        ? rowsItens.filter((row) => selected.includes(row.id))  // Seleção múltipla
        : rowsItens.filter((row) => row.id === selected);  // Seleção única

        setSelectedRows(newRow);
    }

    useEffect(() => {
        console.log("selectedRows atualizado:", selectedRows);
    }, [selectedRows]);
    
    useEffect(() => {
        console.log("Observacao atualizado:", observacao);
    }, [observacao]);

    
    useEffect(() => {

    }, [])

    //UPDATE
    useEffect(() => {
        const fetchData = async() =>{
            const response = await listarSetores();
            
            setRowsSetores([]);

            response.forEach(row => {

                setRowsSetores(prevRows => [
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

    const handleUpdateTable = () => {
        setUpdateTable(!updateTable);

        setUpdateTablePressionado(true);
        setResetSelect(!resetSelect)

        setTimeout(() => {
            setUpdateTablePressionado(false);
        }, 2000)
    }


    const handleCloseDialog = (text) => {  
        setObservacao(text);
        const updatedRows = selectedRows.map(row => ({
            ...row,
            quantidade,
            observacao: text,
        }));
    
        updatedRows.forEach(updatedRow => {
            const index = rowsItensEnviar.findIndex(row => row.id === updatedRow.id);
    
            if (index !== -1) {
                setRowsItensEnviar(prevRows => 
                    prevRows.map(row =>
                        row.id === updatedRow.id ? { ...row, quantidade, observacao: text } : row
                    )
                );
            } else {
                // Se o item não existir, adiciona ele com os campos quantidade e observacao
                setRowsItensEnviar(prevRows => [...prevRows, { ...updatedRow, quantidade, observacao: text}]);
            }
        });
        setOpenDialog(false);
    }

    const handleSendItem = () => {
        if (selectedRows.length > 0) {
            let testQtd = false;
            selectedRows.forEach((row) =>{
                testQtd = quantidade == row.quantidade;
                console.log(row.quantidade);
                console.log(testQtd);
                console.log(quantidade);
            });
            if(testQtd){
                const updatedRows = selectedRows.map(row => ({
                    ...row,
                    quantidade,
                    observacao: observacao
                }));
            
                updatedRows.forEach(updatedRow => {
                    const index = rowsItensEnviar.findIndex(row => row.id === updatedRow.id);
            
                    if (index !== -1) {
                        setRowsItensEnviar(prevRows => 
                            prevRows.map(row =>
                                row.id === updatedRow.id ? { ...row, quantidade, observacao } : row
                            )
                        );
                    } else {
                        // Se o item não existir, adiciona ele com os campos quantidade e observacao
                        setRowsItensEnviar(prevRows => [...prevRows, { ...updatedRow, quantidade, observacao}]);
                    }
                });
            } else {
                setOpenDialog(true);
                
            }
        


        } else {
            alert("Selecione um item requisitado para enviar");
        }
    }

    const handleConfirm = () => {
        if(rowsItensEnviar.length !== 0){
            
        }
    }

    const [activateBodyHamburguer, setActivateBodyHamburguer] = useState(false);

    return(
        <div style={{display:'flex'}}>
            <Navbar/>
            <ContainerTabelas>
                <ContainerSetores>
                    <TextField style={{width:'50%', margin:'40px 0px 20px 0px'}} label="Pesquisar"></TextField>
                    <Tabela
                        title="Requisições de Cada Setor" 
                        tableHeader={tableHeaderSetores} 
                        rows={rowsSetores} 
                        onDeleteRow={handleDeleteRowSetor}
                        fontHeader={12}
                        visibilityDense={false}
                        disableDelete={true}
                        activateBodyHamburguer = {activateBodyHamburguer}
                        updateSelect={handleSelected}
                    />
                    <ComboBox    
                        label="Selecione o Nº da Requisição"
                        sx={{
                            margin: '20px 0px 42px 0px'
                        }}
                    />
                    <Tabela
                            title="Itens Requisitados"
                            tableHeader={tableHeaderItens} 
                            rows={rowsItens} 
                            onDeleteRow={handleDeleteRowItem}
                            fontHeader={12}
                            visibilityDense={false}
                            disableDelete={true}
                            activateBodyHamburguer = {activateBodyHamburguer}
                            updateSelect={handleSelected}
                    />
                    <ContainerItensEnviados>
                        <TextField 
                            label="Quantidade"
                            type="number"
                            value={quantidade}
                            onChange={handleQuantidadeChange}
                        />
                        <BotaoPersonalizado type="button" text="Enviar" color="amarelo" onClick={handleSendItem}/>
                        <ObservacaoDialog 
                            open={openDialog} 
                            setOpen={setOpenDialog} 
                            setObservacao={setObservacao}
                            handleCloseDialog={handleCloseDialog}
                        />
                    </ContainerItensEnviados>
                </ContainerSetores>

                <ContainerItens>
                    
                    <div style={{maxWidth: '794px'}}>
                        <Tabela
                            title="Itens para enviar" 
                            tableHeader={tableHeaderItensEnviar} 
                            rows={rowsItensEnviar} 
                            onDeleteRow={handleDeleteRowItemEnviar}
                            fontHeader={12}
                            visibilityDense={false}
                            activateBodyHamburguer = {activateBodyHamburguer}
                            updateSelect={handleSelected}
                        />
                        <BotaoPersonalizado width="100%" text="Confirmar Entrega" color="marrom"/>  
                    </div>
                    
                    
                </ContainerItens>
            </ContainerTabelas>
        </div>
    );
}