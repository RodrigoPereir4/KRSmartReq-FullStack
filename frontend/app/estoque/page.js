'use client'



import BotaoPersonalizado from "@/components/generics/BotaoPersonalizado";
import ComboBox from "@/components/MUI/ComboBox";
import Tabela from "@/components/MUI/Tabela";
import Navbar from "@/components/sideBar/Navbar";
import { TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const tableHeaderSetores = [
      {
        id: 'idSetor',
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
        id: 'requisicoes',
        numeric: true,
        disablePadding: false,
        label: 'Requisições',
      },
      {
        id: 'situacao',
        numeric: false,
        disablePadding: false,
        label: 'Situação',
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
   
    const rowsSetores = [
        {
            idItem: 3,
            setor: 'cozinha',
            requisicoes: 3,
            situacao: 'Pendente'
        },
        {
            idItem: 6,
            setor: 'café',
            requisicoes: 5,
            situacao: 'Pendente'
        },
        {
            idItem: 1,
            setor: 'bar',
            requisicoes: 4,
            situacao: 'Normal'
        },
    ];

    const rowsItens = [
        {
            idItem: '3333333KS',
            produto: 'Barra de chocolate ao leite',
            medida: 'kg',
            quantidade: 20
        },
        {
            idItem: '333VVVV33KS',
            produto: 'Sorvete cream and Mulcream Dengo',
            medida: 'kg',
            quantidade: 10
        },
        {
            idItem: '333VVV3333KS',
            produto: 'Copos de 300ml',
            medida: 'caixas',
            quantidade: 20
        },
        {
            idItem: '33VV33333KS',
            produto: 'Barra de chocolate Branco',
            medida: 'kg',
            quantidade: 20
        },
        {
            idItem: 'VVVADAWDWADAW',
            produto: 'Barra de chocolate Crocante',
            medida: 'kg',
            quantidade: 20
        },
    ];

    const [rowsItensEnviar, setRowsItensEnviar] = useState([
        {
            idItem: '3333333KS',
            produto: 'Barra de chocolate ao leite',
            medida: 'kg',
            quantidade: 20,
            observacao: 'aaaaaawd8ipçhon iujçn hfceuljoçkw newçolijufhn wioeuçjfhn'
        },
        {
            idItem: '333VVVV33KS',
            produto: 'Sorvete cream and Mulcream Dengo',
            medida: 'kg',
            quantidade: 10,
            observacao: 'aaaaaawd8ipçhon iujçn hfceuljoçkw newçolijufhn wioeuçjfhn'
        },
        {
            idItem: '333VVV3333KS',
            produto: 'Copos de 300ml',
            medida: 'caixas',
            quantidade: 20,
            observacao: 'aaaaaawd8ipçhon iujçn hfceuljoçkw newçolijufhn wioeuçjfhn'
        },
        {
            idItem: '33VV33333KS',
            produto: 'Barra de chocolate Branco',
            medida: 'kg',
            quantidade: 20,
             observacao: 'aaaaaawd8ipçhon iujçn hfceuljoçkw newçolijufhn wioeuçjfhn'
        },
        {
            idItem: 'VVVADAWDWADAW',
            produto: 'Barra de chocolate Crocante',
            medida: 'kg',
            quantidade: 20,
            observacao: 'aaaaaawd8ipçhon iujçn hfceuljoçkw newçolijufhn wioeuçjfhn'
        },
    ]);

    console.log(rowsItens);
    const [selectedRows, setSelectedRows] = useState([]);
    const [quantidade, setQuantidade] = useState(0);

    const handleQuantidadeChange = (e) => {
        setQuantidade(e.target.value);
    };

    const handleDeleteRow = () =>{
        console.log('aa');
    }

    const handleSelected = (selected) =>{
        setSelectedRows(selected);
        console.log(selectedRows);
    }

    const handleSendItem = () => {
        
        console.log(rowsItensEnviar);
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
                        onDeleteRow={handleDeleteRow}
                        fontHeader={12}
                        visibilityDense={false}
                        activateBodyHamburguer = {activateBodyHamburguer}
                    />
                    <ContainerItensEnviados>
                        <TextField 
                            label="Quantidade"
                            value={quantidade}
                            onChange={handleQuantidadeChange}
                        />
                        <BotaoPersonalizado type="button" text="Enviar" color="amarelo" onClick={handleSendItem}/>
                    </ContainerItensEnviados>
                </ContainerSetores>

                <ContainerItens>
                    <h3>Requisição do Setor: .....</h3>
                    <ComboBox    
                        label="Nº Requisição"
                        sx={{
                            margin: '20px 0px 42px 0px'
                        }}
                    />
                    <div style={{maxWidth: '794px'}}>
                        <Tabela
                            tableHeader={tableHeaderItens} 
                            rows={rowsItens} 
                            onDeleteRow={handleDeleteRow}
                            fontHeader={12}
                            visibilityDense={false}
                            activateBodyHamburguer = {activateBodyHamburguer}
                            disableHead={true}
                            updateSelect={handleSelected}
                        />

                        <Tabela
                            title="Itens para enviar" 
                            tableHeader={tableHeaderItensEnviar} 
                            rows={rowsItensEnviar} 
                            onDeleteRow={handleDeleteRow}
                            fontHeader={12}
                            visibilityDense={false}
                            disableHead={true}
                            activateBodyHamburguer = {activateBodyHamburguer}
                        />
                        <BotaoPersonalizado width="100%" text="Confirmar" color="marrom"/>  
                    </div>
                    
                    
                </ContainerItens>

                
                
            </ContainerTabelas>
        </div>
    );
}