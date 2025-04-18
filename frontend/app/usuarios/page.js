'use client'

import BotaoPersonalizado from "@/components/generics/BotaoPersonalizado";
import Tabela from "@/components/MUI/Tabela";
import Navbar from "@/components/sideBar/Navbar";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import reload from "@/images/reload.svg";
import reloadStatic from "@/images/reloadStatic.svg";
import NovoUsuarioDialog from "@/components/MUI/NovoUsuarioDialog";
import { listarUsuarios,  procurarSetorNome, cadastrarUsuario, atualizarUsuario, inativarUsuarios } from "@/services/UsuarioService";

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
        { id: 1, email: 'aaaa@wdaawdwa', password: 3, setorNome: 'Cozinha' },
        { id: 2, email: 'bbbbb@bbdwa', password: 5, setorNome: 'Café' },
        { id: 3, email: 'ccccc@ccccdwa', password: '233232fad@', setorNome: 'Bar' },
        { id: 4, email: 'ddddd@ddwa', password: 12, setorNome: 'Cozinha' },
        { id: 5, email: 'eeeee@eeewda', password: 7, setorNome: 'Café' },
        { id: 6, email: 'fffff@fffwdwa', password: 'secreta123', setorNome: 'Bar' },
        { id: 7, email: 'ggggg@ggggdwa', password: 9, setorNome: 'Cozinha' },
        { id: 8, email: 'hhhhh@hhaawda', password: 'senha456', setorNome: 'Café' },
        { id: 9, email: 'iiiii@iiiwda', password: 8, setorNome: 'Bar' },
        { id: 10, email: 'jjjjj@jjjwdwa', password: 15, setorNome: 'Cozinha' },
        { id: 11, email: 'kkkkk@kkkwda', password: 'chave1234', setorNome: 'Café' },
        { id: 12, email: 'lllll@lllwdwa', password: 2, setorNome: 'Bar' },
        { id: 13, email: 'mmmmm@mmmwda', password: 'qwerty678', setorNome: 'Cozinha' },
        { id: 14, email: 'nnnnn@nnnwda', password: 11, setorNome: 'Café' },
        { id: 15, email: 'ooooo@ooowda', password: 'pass1234', setorNome: 'Bar' },
        { id: 16, email: 'ppppp@pppwda', password: 10, setorNome: 'Cozinha' },
        { id: 17, email: 'qqqqq@qqqwda', password: 6, setorNome: 'Café' },
        { id: 18, email: 'rrrrr@rrrwda', password: 'senha999', setorNome: 'Bar' },
        { id: 19, email: 'sssss@ssswda', password: 13, setorNome: 'Cozinha' },
        { id: 20, email: 'ttttt@tttwda', password: 4, setorNome: 'Café' },
        { id: 21, email: 'uuuuu@uuuwda', password: 'abcd1234', setorNome: 'Bar' },
        { id: 22, email: 'vvvvv@vvvwda', password: 16, setorNome: 'Cozinha' },
        { id: 23, email: 'wwwww@wwwwda', password: 'mypassword', setorNome: 'Café' },
        { id: 24, email: 'xxxxx@xxxwda', password: 14, setorNome: 'Bar' },
        { id: 25, email: 'yyyyy@yyyywda', password: 18, setorNome: 'Cozinha' },
        { id: 26, email: 'zzzzz@zzzzwda', password: '1234pass', setorNome: 'Café' },
        { id: 27, email: 'aaaaa@aaaaawd', password: 19, setorNome: 'Bar' },
        { id: 28, email: 'bbbbb@bbbwadf', password: 'test1234', setorNome: 'Cozinha' },
        { id: 29, email: 'ccccc@ccccwdf', password: 20, setorNome: 'Café' },
        { id: 30, email: 'ddddd@dddwda', password: 'securepass1', setorNome: 'Bar' }
    ]);

    //Pesquisa, manter alterações
    const [rowsPadroes, setRowsPadroes] = useState([]);

    //Rows para enviar para banco
    const [rowsBanco, setRowsBanco] = useState([]);

    const [openInsertDialog, setOpenInsertDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [setorNome, setSetorNome] = useState('');

    const [pesquisa, setPesquisa] = useState('');

    const [selectedRows, setSelectedRows] = useState([]);
    const [updateTable, setUpdateTable] = useState(false);
    const [updateTablePressionado, setUpdateTablePressionado] = useState(false);

    const [resetSelect, setResetSelect] = useState(false);

    const handleSelected = (selected) =>{
        const newRow = Array.isArray(selected)
        ? rowsUsuarios.filter((row) => selected.includes(row.id))  // Seleção múltipla
        : rowsUsuarios.filter((row) => row.id === selected);  // Seleção única

        setSelectedRows(newRow);
    }

    useEffect(() => {
        if (selectedRows.length > 0) {
          console.log('Linhas selecionadas:', selectedRows);
        }
      }, [selectedRows]); 

      useEffect(() => {
        console.log('ResetSelected:', resetSelect);
      }, [resetSelect]); 

    const handleAddUsuario = () =>{
        setOpenInsertDialog(true);
    }

    const handleCloseInsertDialog = async ({email, password, setorNome}) => {  
        console.log(setorNome);
        setEmail(email);
        setPassword(password);
        setSetorNome(setorNome);
        
        // Se o item não existir, adiciona ele com os campos quantidade e observacao
            
            if (!rowsUsuarios.some(user => user.email === email)) {

                const setorObj = await procurarSetorNome(setorNome);
                const setor = {
                    setorId: setorObj.setorId
                };
                
                console.log({email, password, setor});
                const result = await cadastrarUsuario({email, password, setor});
                console.log(result);
                if(result !== "Usuário cadastrado!"){
                    alert("Não foi possível cadastrar esse usuário!");
                } else {
                    alert(result);
                    setOpenInsertDialog(false);      
                    handleUpdateTable();
                }

            } else {
                alert("Esse email já existe no sistema!");
            }
        
    }

    const handleUpdateUsuario = () =>{

        if(selectedRows.length == 0){
            alert("Selecione um usuário da tabela para editar!");
        } else if(selectedRows.length > 1){
            alert("Selecione apenas uma linha da tabela!")
        } else {
            setOpenUpdateDialog(true);
        }
    }

    const handleCloseUpdateUsuario = async ({email, password, setorNome}) => {

            setEmail(email);
            setPassword(password);
            setSetorNome(setorNome);

            const setorObj = await procurarSetorNome(setorNome);
            const idSetor = selectedRows[0].id;

            const updatedRow = {
                email: email,
                password: password,
                setor: {
                    setorId: setorObj.setorId
                }
            };
            
           /*
            console.log(selectedRows);
            console.log(updatedRow);


            setRowsUsuarios(prevRows => 
                prevRows.map(row =>
                    row.id === updatedRow.id
                        ? { ...row, email: updatedRow.email, password: updatedRow.password, setorNome: updatedRow.setorNome }
                        : row
                )
            );
           */

            console.log(updatedRow);
            const result = await atualizarUsuario(idSetor, updatedRow);
            console.log(result);
            if(result !== "Usuario Atualizado com sucesso!"){
                alert(result);
            } else {
                alert(result);
                setOpenUpdateDialog(false);    
                handleUpdateTable();
            }
    }

    const handleViewUsuario = () => {
        if(selectedRows.length == 0){
            alert("Selecione um usuário da tabela para visualizar!");
        } else if(selectedRows.length > 1){
            alert("Selecione apenas um usuário da tabela!")
        } else {
            setOpenViewDialog(true)
        }
    }

    const handleCloseViewDialog = ({email, password, setorNome}) => {  
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

    const handleInativarProduto = async () => {
        if(selectedRows.length == 0){
            alert("Selecione um usuário da tabela para inativar!");
        } else if(selectedRows.length > 1){
            alert("Selecione apenas um usuário da tabela!")
        } else {
            const response = await inativarUsuarios(selectedRows[0].id);
            console.log(response);
            if(response !== "Usuário inativado"){
                alert("Não foi possivel inativar esse usuário!");
            }else {
                alert("Usuário inativado com sucesso!");
                handleUpdateTable();
            }
        }
    }

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log(searchTerm);

        setPesquisa(searchTerm);

        if(searchTerm !== ''){
            setRowsUsuarios(rowsPadroes.filter(row => row.email.toLowerCase().includes(searchTerm)));
        } else {
            console.log(rowsUsuarios);
            handleUpdateTable();
        }
    };

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
            const response = await listarUsuarios();
            
            setRowsUsuarios([]);
            setRowsPadroes([]);
            setRowsBanco([]);
            setPesquisa('');

            response.forEach(row => {
                setRowsBanco(prevRows => [
                    ...prevRows,
                    {
                        ...row,
                        setor: {
                            setorId: row.setor.setorId // Mantém apenas setorId
                        }
                    }
                ]);
        
                // Filtrando para a resposta da Tabela (com setorNome)

                setRowsUsuarios(prevRows => [
                    ...prevRows,
                    {
                        ...row,
                        setorNome: row.setor.setorNome // Mantém apenas setorNome
                    }
                ]);

                setRowsPadroes(prevRows => [
                    ...prevRows,
                    {
                        id: prevRows.length,
                        ...row,
                    }
                ]);
            });
        }
        fetchData();
    }, [updateTable])

    return(
        <div style={{display:'flex'}}>
            <Navbar/>
            <ContainerTabela>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: "flex", alignItems: "center", gap: 20}}>
                        <h1>Lista de Usuários</h1>
                        <button onClick={handleUpdateTable} 
                            style={{border: "none", backgroundColor: "#ffffff", cursor: "pointer"}}> 

                            {updateTablePressionado ? (<Image src={reload} alt="Botão para recarregar"/> )
                            : (<Image src={reloadStatic} alt="Botão para recarregar"/>)}
                        </button>
                    </div>

                    <div style={{display: 'flex', alignItems:'center', gap: 10}}>
                        <TextField style={{width: 500}} label={'Pesquisar'} value={pesquisa} onChange={handleSearchChange}/>
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
                    resetSelect={resetSelect}
                    rowsPerPage={25}
                />
                <div style={{display: 'flex', width: '100%', height: 120 , gap: 50}}>
                    <BotaoPersonalizado onClick={handleAddUsuario} width="100%" height="100%" text="+ Novo Usuário" color="marrom"/> 
                    <BotaoPersonalizado onClick={handleViewUsuario} width="100%" height="100%" text="Visualizar" color="amarelo"/> 
                    <BotaoPersonalizado onClick={handleUpdateUsuario} width="100%" height="100%" text="Editar" color="amarelo"/> 
                    <BotaoPersonalizado onClick={handleInativarProduto} width="100%" height="100%" text="Inativar" color="vermelho"/> 
                </div>
                <NovoUsuarioDialog
                    open={openInsertDialog} 
                    setOpen={setOpenInsertDialog} 
                    handleCloseDialog={handleCloseInsertDialog}
                />
                <NovoUsuarioDialog
                    open={openViewDialog} 
                    setOpen={setOpenViewDialog} 
                    handleCloseDialog={handleCloseViewDialog}
                    view={selectedRows}
                />
                <NovoUsuarioDialog
                    open={openUpdateDialog} 
                    setOpen={setOpenUpdateDialog} 
                    handleCloseDialog={handleCloseUpdateUsuario}
                    update={selectedRows}
                />
            </ContainerTabela>
           
        </div>
    );
}