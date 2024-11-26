'use client'

import BotaoPersonalizado from "@/components/generics/BotaoPersonalizado";
import Tabela from "@/components/MUI/Tabela";
import Navbar from "@/components/sideBar/Navbar";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import user2 from "@/images/user2.png";
import NovoProdutoDialog from "@/components/MUI/NovoProdutoDialog";
import { listarProdutos, cadastrarProdutos, atualizarProdutos } from "@/services/ProdutoService";

const tableHeaderSetores = [
    {
        id: 'nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
    },
    {
        id: 'categoria',
        numeric: false,
        disablePadding: false,
        label: 'Categoria',
    },
    {
        id: 'unMedida',
        numeric: false,
        disablePadding: false,
        label: 'Unidade Medida',
    },
    {
        id: 'sku',
        numeric: true,
        disablePadding: false,
        label: 'SKU Produto',
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

export default function Produtos(){

    const [rowsProdutos, setRowsProdutos] = useState([
        { sku: "5", nome: 'aaaa@wdaawdwa', categoria:"frutas",      unMedida: 'Cozinha', status: true },
        { sku: "5", nome: 'bbbbb@bbdwa',   categoria:"frutas",      unMedida: 'Café'   , status: true },
        { sku: "5", nome: 'ccccc@ccccdwa', categoria: '233232fad@', unMedida: 'Bar'    , status: true },
        { sku: "5", nome: 'ddddd@ddwa',    categoria: "frutas",     unMedida: 'Cozinha', status: true },
        { sku: "5", nome: 'eeeee@eeewda',  categoria:"frutas",      unMedida: 'Café'   , status: true },
        { sku: "5", nome: 'fffff@fffwdwa', categoria: 'secreta123', unMedida: 'Bar'    , status: true },
        { sku: "5", nome: 'ggggg@ggggdwa', categoria:"frutas",      unMedida: 'Cozinha', status: true },
        { sku: "5", nome: 'hhhhh@hhaawda', categoria: 'senha456',   unMedida: 'Café'   , status: true },
        { sku: "5", nome: 'iiiii@iiiwda',  categoria:"frutas",      unMedida: 'Bar'    , status: true },
        { sku: "",  nome: 'jjjjj@jjjwdwa', categoria: "frutas",     unMedida: 'Cozinha', status: true },
        { sku: "",  nome: 'kkkkk@kkkwda',  categoria: 'chave1234',  unMedida: 'Café'   , status: true },
        { sku: "",  nome: 'lllll@lllwdwa', categoria:"frutas",      unMedida: 'Bar'    , status: true },
        { sku: "",  nome: 'mmmmm@mmmwda',  categoria: 'qwerty678',  unMedida: 'Cozinha', status: true },
        { sku: "",  nome: 'nnnnn@nnnwda',  categoria: "frutas",     unMedida: 'Café'   , status: true },
        { sku: "",  nome: 'ooooo@ooowda',  categoria: 'pass1234',   unMedida: 'Bar'    , status: true },
        { sku: "",  nome: 'ppppp@pppwda',  categoria: "frutas",     unMedida: 'Cozinha', status: true },
        { sku: "",  nome: 'qqqqq@qqqwda',  categoria:"frutas",      unMedida: 'Café'   , status: true },
        { sku: "",  nome: 'rrrrr@rrrwda',  categoria: 'senha999',   unMedida: 'Bar'    , status: true },
        { sku: "",  nome: 'sssss@ssswda',  categoria: "frutas",     unMedida: 'Cozinha', status: true },
        { sku: "",  nome: 'ttttt@tttwda',  categoria:"frutas",      unMedida: 'Café'   , status: true },
        { sku: "",  nome: 'uuuuu@uuuwda',  categoria: 'abcd1234',   unMedida: 'Bar'    , status: true },
        { sku: "",  nome: 'vvvvv@vvvwda',  categoria: "frutas",     unMedida: 'Cozinha', status: true },
        { sku: "",  nome: 'wwwww@wwwwda',  categoria: 'mypassword', unMedida: 'Café'   , status: true },
        { sku: "",  nome: 'xxxxx@xxxwda',  categoria: "frutas",     unMedida: 'Bar'    , status: true },
        { sku: "",  nome: 'yyyyy@yyyywda', categoria: "frutas",     unMedida: 'Cozinha', status: true },
        { sku: "",  nome: 'zzzzz@zzzzwda', categoria: '1234pass',   unMedida: 'Café'   , status: true },
        { sku: "",  nome: 'aaaaa@aaaaawd', categoria: "frutas",     unMedida: 'Bar'    , status: true },
        { sku: "",  nome: 'bbbbb@bbbwadf', categoria: 'test1234',   unMedida: 'Cozinha', status: true },
        { sku: "",  nome: 'ccccc@ccccwdf', categoria: "frutas",     unMedida: 'Café'   , status: true },
        { sku: "",  nome: 'ddddd@dddwda',  categoria: 'securepass1',unMedida: 'Bar'    , status: true }
    ]);

    //Pesquisa, manter alterações
    const [rowsPadroes, setRowsPadroes] = useState([]);

    //Rows para enviar para banco
    const [rowsBanco, setRowsBanco] = useState([]);

    const [openInsertDialog, setOpenInsertDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    
    const [sku, setSku] = useState('');
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [unMedida, setUnMedida] = useState('');
    const [status, setStatus] = useState(false);

    const [pesquisa, setPesquisa] = useState('');

    const [selectedRows, setSelectedRows] = useState([]);
    const [updateTable, setUpdateTable] = useState(false);

    const [idRows, setIdRows] = useState(0);


    const [resetSelect, setResetSelect] = useState(false);

    const handleSelected = (selected) =>{
        const newRow = Array.isArray(selected)
        ? rowsProdutos.filter((row) => selected.includes(row.id))  // Seleção múltipla
        : rowsProdutos.filter((row) => row.id === selected);  // Seleção única

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

    const handleAddProduto = () =>{
        setOpenInsertDialog(true);
    }

    const handleCloseInsertDialog = async ({nome, sku, categoria, unMedida, status}) => {  
        setNome(nome);
        setSku(sku);
        setCategoria(categoria);
        setUnMedida(unMedida);
        setStatus(status);
        
        // Se o item não existir, adiciona ele com os campos quantidade e observacao
            
            if (!rowsProdutos.some(produto => produto.sku === sku)) {
                
                console.log({nome, sku, categoria, unMedida, status});
                const result = await cadastrarProdutos({nome, sku, categoria, unMedida, status});
                console.log(result);
                if(result !== "Produto cadastrado!"){
                    alert("Não foi possível cadastrar esse usuário!");
                } else {
                    alert(result);
                    setOpenInsertDialog(false);      
                    handleUpdateTable();
                }

            } else {
                alert("Esse SKU já existe no sistema!");
            }
        
    }

    const handleUpdateProduto = () =>{

        if(selectedRows.length == 0){
            alert("Selecione um usuário da tabela para editar!");
        } else if(selectedRows.length > 1){
            alert("Selecione apenas uma linha da tabela!")
        } else {
            setOpenUpdateDialog(true);
        }
    }

    const handleCloseUpdateProduto = async ({nome, sku, categoria, unMedida, status}) => {

            setNome(nome);
            setSku(sku);
            setCategoria(categoria);
            setUnMedida(unMedida);
            setStatus(status);

            const updatedRow = {
                nome: nome,
                status: status,
                categoria: categoria,
                unMedida: unMedida
            };
            
           /*
            console.log(selectedRows);
            console.log(updatedRow);


            setRowsProdutos(prevRows => 
                prevRows.map(row =>
                    row.id === updatedRow.id
                        ? { ...row, nome: updatedRow.nome, categoria: updatedRow.categoria, unMedida: updatedRow.unMedida }
                        : row
                )
            );
           */

            console.log(updatedRow);
            const result = await atualizarProdutos(sku, updatedRow);
            console.log(result);
            if(result !== "Produto Atualizado com sucesso!"){
                alert(result);
            } else {
                alert(result);
                setOpenUpdateDialog(false); 
                setResetSelect(!resetSelect);     
                handleUpdateTable();
            }
    }

    const handleViewProduto = () => {
        if(selectedRows.length == 0){
            alert("Selecione um usuário da tabela para visualizar!");
        } else if(selectedRows.length > 1){
            alert("Selecione apenas um usuário da tabela!")
        } else {
            setOpenViewDialog(true)
        }
    }

    const handleCloseViewDialog = ({nome, sku, categoria, unidadeMedida, status}) => {  
        setNome(nome);
        setSku(sku);
        setCategoria(categoria);
        setUnMedida(unMedida);
        setStatus(status);
        
        // Se o item não existir, adiciona ele com os campos quantidade e observacao
            
            if (!rowsProdutos.some(user => user.nome === nome)) {
                setRowsProdutos(prevRows => {
    
                    const maxId = prevRows.length > 0 ? Math.max(...prevRows.map(user => user.id)) : 0;
                    const newId = maxId + 1;
                    
                    return [...prevRows, {id: newId, nome, categoria, unMedida}]
                }
                );
                setOpenInsertDialog(false);
            } else {
                alert("Esse nome já existe no sistema!");
            }
       
        console.log(rowsProdutos);
        
    }

    /*
    useEffect(() => {
        const rowsPadroes = [...rowsProdutos];
        console.log(rowsProdutos);
        if(pesquisa !== ''){
            setRowsProdutos(rowsProdutos.filter(row => row.nome.includes(pesquisa)));
        } else {
            setRowsProdutos(rowsPadroes);
        }
    }, [pesquisa])*/

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log(searchTerm);

        setPesquisa(searchTerm);

        if(searchTerm !== ''){
            setRowsProdutos(rowsPadroes.filter(row => row.nome.toLowerCase().includes(searchTerm)));
        } else {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log(rowsProdutos);
            handleUpdateTable();
        }
    };

    const handleUpdateTable = () => {
        setUpdateTable(!updateTable);
    }

    useEffect(() => {
        const fetchData = async() =>{
            const response = await listarProdutos();
            
            setRowsProdutos([]);
            setRowsPadroes([]);
            setRowsBanco([]);

            response.forEach(row => {
                setRowsBanco(prevRows => [
                    ...prevRows,
                    {
                        ...row
                    }
                ]);
        
                // Filtrando para a resposta da Tabela (com unMedida)

                setRowsProdutos(prevRows => [
                    ...prevRows,
                    {
                        id: prevRows.length,
                        ...row,
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

    useEffect(() => {
        console.log(rowsBanco);
        console.log(rowsProdutos);
    }, [rowsBanco, rowsProdutos]);

    return(
        <div style={{display:'flex'}}>
            <Navbar/>
            <ContainerTabela>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1>Lista de Produtos</h1>
                    <button onClick={handleUpdateTable}>Atualizar Tabela</button>
                    <div style={{display: 'flex', alignItems:'center', gap: 10, marginBottom: 10}}>
                        <TextField style={{width: 500}} label={'Pesquisar'} value={pesquisa} onChange={handleSearchChange}/>
                        <button style={{border: 'none', borderRadius: 6, padding: '10px 15px', background: '#584438'}}><Image src={user2}/></button>
                    </div>
                </div>
                
                <Tabela
                    title="Produtos" 
                    tableHeader={tableHeaderSetores} 
                    rows={rowsProdutos} 
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
                    <BotaoPersonalizado onClick={handleAddProduto} width="100%" height="100%" text="+ Novo Produto" color="marrom"/> 
                    <BotaoPersonalizado onClick={handleViewProduto} width="100%" height="100%" text="Visualizar" color="amarelo"/> 
                    <BotaoPersonalizado onClick={handleUpdateProduto} width="100%" height="100%" text="Editar" color="amarelo"/> 
                    <BotaoPersonalizado width="100%" height="100%" text="Inativar" color="vermelho"/> 
                </div>
                <NovoProdutoDialog
                    open={openInsertDialog} 
                    setOpen={setOpenInsertDialog} 
                    handleCloseDialog={handleCloseInsertDialog}
                />
                <NovoProdutoDialog
                    open={openViewDialog} 
                    setOpen={setOpenViewDialog} 
                    handleCloseDialog={handleCloseViewDialog}
                    view={selectedRows}
                />
                <NovoProdutoDialog
                    open={openUpdateDialog} 
                    setOpen={setOpenUpdateDialog} 
                    handleCloseDialog={handleCloseUpdateProduto}
                    update={selectedRows}
                />
            </ContainerTabela>
           
        </div>
    );
}