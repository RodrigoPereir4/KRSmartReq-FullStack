'use client'

import BotaoPersonalizado from "@/components/generics/BotaoPersonalizado";
import Tabela from "@/components/MUI/Tabela";
import Navbar from "@/components/sideBar/Navbar";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import user2 from "@/images/user2.png";
import NovoUsuarioDialog from "@/components/MUI/NovoUsuarioDialog";

const tableHeaderSetores = [
    {
      id: 'id',
      numeric: true,
      disablePadding: false,
      label: 'ID Usuário',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'password',
      numeric: true,
      disablePadding: false,
      label: 'Senha',
    },
    {
      id: 'setorNome',
      numeric: false,
      disablePadding: false,
      label: 'Setor',
    },
];

const ContainerTabela = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px;
`

export default function Usuarios(){

    const [rowsUsuarios, setRowsUsuarios] = useState([
        {
            id: 1,
            idSetor: 3,
            setor: 'cozinha',
            requisicoes: 3,
            situacao: 'Pendente'
        },
        {
            id: 2,
            idSetor: 6,
            setor: 'café',
            requisicoes: 5,
            situacao: 'Pendente'
        },
        {
            id: 3,
            idSetor: 1,
            setor: 'bar',
            requisicoes: 4,
            situacao: 'Normal'
        },
    ]);

    const [openInsertDialog, setOpenInsertDialog] = useState(false);

    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [setorNome, setSetorNome] = useState('');

    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelected = (selected) =>{
        const newRow = Array.isArray(selected)
        ? rowsUsuarios.filter((row) => selected.includes(row.id))  // Seleção múltipla
        : rowsUsuarios.filter((row) => row.id === selected);  // Seleção única

        setSelectedRows(newRow);
    }


    const handleAddUsuario = () =>{
        setOpenInsertDialog(true);
    }

    const handleCloseInsertDialog = ({email, password, setorNome}) => {  
        setEmail(email);
        setPassword(password);
        setSetorNome(setorNome);
        

        
        // Se o item não existir, adiciona ele com os campos quantidade e observacao
            
            if (!rowsUsuarios.some(user => user.email === email)) {
                setRowsUsuarios(prevRows => {
    
                    const maxId = prevRows.length > 0 ? Math.max(...prevRows.map(user => user.id)) : 0;
                    const newId = maxId + 1;
                    
                    return [...prevRows, {id: newId, email, password, setorNome}]
                }
                );
                setOpenInsertDialog(false);
            } else {
                alert("Esse email já existe no sistema!");
            }
       
        console.log(rowsUsuarios);
        
    }

    const handleUpdateUsuario = () =>{
        selectedRows.forEach(updatedRow => {
            const index = rowsUsuarios.findIndex(row => row.email === updatedRow.email);
            
            if (index !== -1) {
                setRowsUsuarios(prevRows => 
                    prevRows.map(row =>
                        row.id === updatedRow.id ? row : row
                    )
                );
            } else {
                // Se o item não existir, adiciona ele com os campos quantidade e observacao
                setRowsUsuarios(prevRows => [...prevRows, updatedRow]);
            }
        })
    }

    return(
        <div style={{display:'flex'}}>
            <Navbar/>
            <ContainerTabela>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1>Lista de Usuários</h1>
                    <div style={{display: 'flex', alignItems:'center', gap: 10, marginBottom: 10}}>
                        <TextField style={{width: 500}} label={'Pesquisar'}/>
                        <button style={{border: 'none', borderRadius: 6, padding: '10px 15px', background: '#584438'}}><Image src={user2}/></button>
                    </div>
                </div>
                
                <Tabela
                    title="Usuários" 
                    tableHeader={tableHeaderSetores} 
                    rows={rowsUsuarios} 
                    fontHeader={12}
                    visibilityDense={false}
                    disableHead={true}
                    disableDelete={true}
                    height={580}
                    updateSelect={handleSelected}
                />
                <div style={{display: 'flex', width: '100%', height: 120 , gap: 50}}>
                    <BotaoPersonalizado onClick={handleAddUsuario} width="100%" height="100%" text="+ Novo Usuário" color="marrom"/> 
                    <BotaoPersonalizado width="100%" height="100%" text="Visualizar" color="amarelo"/> 
                    <BotaoPersonalizado width="100%" height="100%" text="Editar" color="amarelo"/> 
                    <BotaoPersonalizado width="100%" height="100%" text="Excluir" color="vermelho"/> 
                </div>
                <NovoUsuarioDialog
                    open={openInsertDialog} 
                    setOpen={setOpenInsertDialog} 
                    handleCloseDialog={handleCloseInsertDialog}
                />
            </ContainerTabela>
           
        </div>
    );
}