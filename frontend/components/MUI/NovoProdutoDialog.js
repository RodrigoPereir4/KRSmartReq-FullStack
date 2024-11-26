'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ComboBox from './ComboBox';
import { useState, useEffect } from 'react';
import { FormControlLabel, FormGroup, Switch, Stack, Typography} from '@mui/material';
import styled from 'styled-components';
import RadiusButton from './RadiusButton';

export default function NovoProdutoDialog(props) {

  const [listaSetores, setListaSetores] = useState([]);
  const [listaSetoresNome, setListaSetoresNome] = useState('');

  const [sku, setSku] = useState('');
  const [password, setPassword] = useState('');
  const [setorNome, setSetorNome] = useState('');

  const [status, setStatus] = useState(false);

  const [skuView, setSkuView] = useState('');
  const [passwordView, setPasswordView] = useState('');
  const [setorNomeView, setSetorNomeView] = useState('');

  const [skuUpdate, setSkuUpdate] = useState('');
  const [passwordUpdate, setPasswordUpdate] = useState('');
  const [setorNomeUpdate, setSetorNomeUpdate] = useState('');

  const [inputSetorNomeValue, setInputSetorNomeValue] = useState('');
  const [inputSetorNomeUpdateValue, setInputSetorNomeUpdateValue] = useState('');

  const [erros, setErros] = useState([]);

  const verificarAtributosNullos = (sku, password, setor) =>{
    console.log(sku);
    console.log(password);
    console.log(setor);
    const atributosParaVerificar = [
      { valor: sku, campo: 'Email' },
      { valor: password, campo: 'Senha' },
      { valor: setor, campo: 'Setor' },
    ];

    const novosErros = [];

    atributosParaVerificar.forEach(attr => {
      if (attr.valor === '' || attr.valor === null || attr.valor === undefined) {
          novosErros.push(attr.campo); // Chame a função para setar o erro
      }
    });

    setErros(novosErros);
    console.log(erros);

    return novosErros.length === 0; // Retorna true se não houver erros
  }

  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSetorNomeValueChange = (event, newValue) => {
    setSetorNome(newValue);
    if(newValue != null){
      alert(newValue);
    }
  };

  const handleInputSetorNomeValueChange = (event, newInputValue) => {
    setInputSetorNomeValue(newInputValue);
  };

  const handleStatusChange = (e) => {
    setStatus(!status);
  }

  //UPDATE
  const handleEmailUpdateChange = (e) => {
    setSkuUpdate(e.target.value);
    setSku(e.target.value);
  };

  const handlePasswordUpdateChange = (e) => {
    setPasswordUpdate(e.target.value);
    setPassword(e.target.value);
  };

  const handleSetorNomeUpdateValueChange = (event, newValue) => {
    setSetorNomeUpdate(newValue);
    setSetorNome(newValue);
    if(newValue != null){
      alert(newValue);
    }
  };

  const handleInputSetorNomeUpdateValueChange = (event, newInputValue) => {
    setInputSetorNomeUpdateValue(newInputValue);
    setInputSetorNomeValue(newInputValue);
  };

  const handleClose = () => {
    props.setOpen(false);
  }

  useEffect(() => {
    // Verifique se props.view é um array e não está vazio
    if (Array.isArray(props.view) && props.view.length > 0) {
      setSkuView(props.view[0].sku);  // Acessa o sku do primeiro item
      setPasswordView(props.view[0].password);  // Acessa a senha do primeiro item
      setSetorNomeView(props.view[0].setorNome);  // Acessa o primeiro item do array
    } else {
      console.log("props.view não é um array válido ou está vazio");
    }
  }, [props.view]);

  useEffect(() => {
    // Verifique se props.view é um array e não está vazio
    if (Array.isArray(props.update) && props.update.length > 0) {
      setSkuUpdate(props.update[0].sku);  // Acessa o sku do primeiro item
      setPasswordUpdate(props.update[0].password);  // Acessa a senha do primeiro item
      setSetorNomeUpdate(props.update[0].setorNome);  // Acessa o primeiro item do array]

      //Padrões se não preencher
      setSku(props.update[0].sku);
      setPassword(props.update[0].password);
      setSetorNome(props.update[0].setorNome);
    } else {
      console.log("props.update não é um array válido ou está vazio");
    }
  }, [props.update]);


  useEffect(() => {
    const carregarSetores = async() => {
        try{
            const response = await fetch('http://localhost:8080/setor/listar', {
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
            setListaSetores(result);
           
            const nomesSetores = result.map((row) => row.setorNome);
            setListaSetoresNome(nomesSetores);
            console.log(nomesSetores);
        }catch(error){
            alert("Erro ao carregar as categorias: " + error.message);
        }
    };
    carregarSetores();
}, []);

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();

            if(!verificarAtributosNullos(sku, password, setorNome)){
              alert("Preencha os campos corretamente!")
            }else {
              props.handleCloseDialog({sku, password, setorNome});
              if(!props.update){
                setSku('');
                setPassword('');
                setSetorNome('');
              }
            }
          },
        }}
      >
        {props.view ? <DialogTitle>Visualizar produto</DialogTitle> : props.update? <DialogTitle>Editar produto</DialogTitle> : <DialogTitle>Inserir Novo produto</DialogTitle>}
        
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="skuText"
            value={skuView !== '' ? skuView : skuUpdate !== '' ? skuUpdate : sku}
            onChange={props.update ? handleEmailUpdateChange : handleSkuChange}
            name="sku"
            label="SKU"
            disabled={props.view ? true : false}
            fullWidth
            rows={4}
          />

          <TextField
            sx={{
              marginTop: 2, 
            }}
            autoFocus
            required
            margin="dense"
            id="passwordText"
            value={passwordView !== '' ? passwordView : passwordUpdate !== '' ? passwordUpdate : password}
            onChange={props.update ? handlePasswordUpdateChange: handlePasswordChange}
            name="password"
            type="password"
            label="Senha"
            disabled={props.view ? true : false}
            fullWidth
            rows={4}
          />

          <ComboBox
            sx={{
              marginTop: 2, 
            }}
            name="categoriaNome"
            label="Selecione a categoria do Produto!"
            value={setorNomeView !== '' ? setorNomeView : setorNomeUpdate !== '' ? setorNomeUpdate: setorNome}
            listarItens={listaSetoresNome}
            inputValue={props.update ? inputSetorNomeUpdateValue : inputSetorNomeValue} 
            handleValueChange={props.update ? handleSetorNomeUpdateValueChange: handleSetorNomeValueChange} 
            handleInputValueChange={props.update ? handleInputSetorNomeUpdateValueChange: handleInputSetorNomeValueChange}
          />

          <ComboBox
            sx={{
              marginTop: 2, 
            }}
            name="unidadeMedidaNome"
            label="Selecione a unidade de medida do Produto!"
            value={setorNomeView !== '' ? setorNomeView : setorNomeUpdate !== '' ? setorNomeUpdate: setorNome}
            listarItens={listaSetoresNome}
            inputValue={props.update ? inputSetorNomeUpdateValue : inputSetorNomeValue} 
            handleValueChange={props.update ? handleSetorNomeUpdateValueChange: handleSetorNomeValueChange} 
            handleInputValueChange={props.update ? handleInputSetorNomeUpdateValueChange: handleInputSetorNomeValueChange}
          />

          <RadiusButton checked={status} handleChange={handleStatusChange}/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" style={{display: props.view ? 'none' : 'flex'}}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
