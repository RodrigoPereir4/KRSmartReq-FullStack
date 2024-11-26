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

  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaCategoriasNome, setListaCategoriasNome] = useState([]);

  const [listaUnidadeMedida, setListaUnidadeMedida] = useState([]);
  const [listaUnidadeMedidaNome, setListaUnidadeMedidaNome] = useState([]);

  const [sku, setSku] = useState('');
  const [nome, setNome] = useState('');
  const [categoriaNome, setCategoriaNome] = useState('');
  const [unMedida, setUnMedida] = useState('');

  const [status, setStatus] = useState(false);

  const [skuView, setSkuView] = useState('');
  const [nomeView, setNomeView] = useState('');
  const [categoriaNomeView, setCategoriaNomeView] = useState('');
  const [unidadeMedidaView, setUnidadeMedidaView] = useState('');

  const [statusView, setStatusView] = useState(status);

  const [skuUpdate, setSkuUpdate] = useState('');
  const [nomeUpdate, setNomeUpdate] = useState('');
  const [categoriaNomeUpdate, setCategoriaNomeUpdate] = useState('');
  const [unidadeMedidaUpdate, setUnidadeMedidaUpdate] = useState('');

  const [statusUpdate, setStatusUpdate] = useState(status);

  const [inputCategoriaNomeValue, setInputCategoriaNomeValue] = useState('');
  const [inputCategoriaNomeUpdateValue, setInputCategoriaNomeUpdateValue] = useState('');
  
  const [inputUnidadeMedidaValue, setInputUnidadeMedidaValue] = useState('');
  const [inputUnidadeMedidaUpdateValue, setInputUnidadeMedidaUpdateValue] = useState('');

  const [erros, setErros] = useState([]);

  const verificarAtributosNullos = (sku, nome, categoria, unMedida) =>{
    console.log(sku);
    console.log(nome);
    console.log(categoria);
    console.log(unMedida);
    const atributosParaVerificar = [
      { valor: sku, campo: 'Email' },
      { valor: nome, campo: 'Senha' },
      { valor: categoria, campo: 'Categoria' },
      {valor: unMedida, campo: 'UnidadeMedida'},
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

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleCategoriaNomeValueChange = (event, newValue) => {
    setCategoriaNome(newValue);
    if(newValue != null){
      alert(newValue);
    }
  };

  const handleInputCategoriaNomeValueChange = (event, newInputValue) => {
    setInputCategoriaNomeValue(newInputValue);
  };

  const handleUnidadeMedidaValueChange = (event, newValue) => {
    setUnMedida(newValue);
    if(newValue != null){
      alert(newValue);
    }
  };

  const handleInputUnidadeMedidaValueChange = (event, newInputValue) => {
    setInputUnidadeMedidaValue(newInputValue);
  };

  const handleStatusChange = (e) => {
    setStatus(!status);
  }

  //UPDATE
  const handleSkuUpdateChange = (e) => {
    setSkuUpdate(e.target.value);
    setSku(e.target.value);
  };

  const handleNomeUpdateChange = (e) => {
    setNomeUpdate(e.target.value);
    setNome(e.target.value);
  };

  const handleCategoriaNomeUpdateValueChange = (event, newValue) => {
    setCategoriaNomeUpdate(newValue);
    setCategoriaNome(newValue);
    if(newValue != null){
      alert(newValue);
    }
  };

  const handleInputCategoriaNomeUpdateValueChange = (event, newInputValue) => {
    setInputCategoriaNomeUpdateValue(newInputValue);
    setInputCategoriaNomeValue(newInputValue);
  };

  const handleUnidadeMedidaUpdateValueChange = (event, newValue) => {
    setUnidadeMedidaUpdate(newValue);
    setUnMedida(newValue);
    if(newValue != null){
      alert(newValue);
    }
  };

  const handleInputUnidadeMedidaUpdateValueChange = (event, newInputValue) => {
    setInputUnidadeMedidaUpdateValue(newInputValue);
    setInputUnidadeMedidaValue(newInputValue);
  };

  const handleClose = () => {
    props.setOpen(false);
  }

  useEffect(() => {
    // Verifique se props.view é um array e não está vazio
    if (Array.isArray(props.view) && props.view.length > 0) {
      setSkuView(props.view[0].sku);  // Acessa o sku do primeiro item
      setNomeView(props.view[0].nome);  // Acessa a senha do primeiro item
      setCategoriaNomeView(props.view[0].categoriaNome);  // Acessa o primeiro item do array
      setUnidadeMedidaView(props.view[0].unMedida);  // Acessa o primeiro item do array
      setStatusView(props.view[0].status);  // Acessa o primeiro item do array
    } else {
      console.log("props.view não é um array válido ou está vazio");
    }
  }, [props.view]);

  useEffect(() => {
    // Verifique se props.view é um array e não está vazio
    if (Array.isArray(props.update) && props.update.length > 0) {
      setSkuUpdate(props.update[0].sku);  // Acessa o sku do primeiro item
      setNomeUpdate(props.update[0].nome);  // Acessa a senha do primeiro item
      setCategoriaNomeUpdate(props.update[0].categoriaNome);  // Acessa o primeiro item do array
      setUnidadeMedidaUpdate(props.update[0].unMedida);  // Acessa o primeiro item do array
      setStatusUpdate(props.update[0].status);  // Acessa o primeiro item do array

      //Padrões se não preencher
      setSku(props.update[0].sku);
      setNome(props.update[0].nome);
      setCategoriaNome(props.update[0].categoriaNome);
      setUnMedida(props.update[0].unMedida);
      setStatus(props.update[0].status);
    } else {
      console.log("props.update não é um array válido ou está vazio");
    }
  }, [props.update]);


  useEffect(() => {
    const carregarCategorias = async() => {
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
            setListaCategoriasNome(result);
            
        }catch(error){
            alert("Erro ao carregar as categorias: " + error.message);
        }
    };
    carregarCategorias();
  }, []);

  useEffect(() => {
    const carregarUnidadeMedida = async() => {
        try{
            const response = await fetch('http://localhost:8080/produto/listarUnidadeMedida', {
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
            setListaUnidadeMedidaNome(result);

        }catch(error){
            alert("Erro ao carregar as categorias: " + error.message);
        }
    };
    carregarUnidadeMedida();
  }, []);

  useEffect(() => {
    console.log(listaCategoriasNome);
  }, [listaCategoriasNome])

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();

            if(!verificarAtributosNullos(sku, nome, categoriaNome, unMedida)){
              alert("Preencha os campos corretamente!")
            }else {
              props.handleCloseDialog({sku, nome, categoriaNome, unMedida, status});
              if(!props.update){
                setSku('');
                setNome('');
                setCategoriaNome('');
                setUnMedida('');
                setStatus(false);
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
            onChange={props.update ? handleSkuUpdateChange : handleSkuChange}
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
            id="nomeText"
            value={nomeView !== '' ? nomeView : nomeUpdate !== '' ? nomeUpdate : nome}
            onChange={props.update ? handleNomeUpdateChange: handleNomeChange}
            name="nome"
            label="Nome do Produto"
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
            value={categoriaNomeView !== '' ? categoriaNomeView : categoriaNomeUpdate !== '' ? categoriaNomeUpdate: categoriaNome}
            listarItens={listaCategoriasNome}
            inputValue={props.update ? inputCategoriaNomeUpdateValue : inputCategoriaNomeValue} 
            handleValueChange={props.update ? handleCategoriaNomeUpdateValueChange: handleCategoriaNomeValueChange} 
            handleInputValueChange={props.update ? handleInputCategoriaNomeUpdateValueChange: handleInputCategoriaNomeValueChange}
          />

          <ComboBox
            sx={{
              marginTop: 2, 
            }}
            name="unMedida"
            label="Selecione a unidade de medida do Produto!"
            value={unidadeMedidaView !== '' ? unidadeMedidaView : unidadeMedidaUpdate !== '' ? unidadeMedidaUpdate: unMedida}
            listarItens={listaUnidadeMedidaNome}
            inputValue={props.update ? inputUnidadeMedidaUpdateValue : inputUnidadeMedidaValue} 
            handleValueChange={props.update ? handleUnidadeMedidaUpdateValueChange: handleUnidadeMedidaValueChange} 
            handleInputValueChange={props.update ? handleInputUnidadeMedidaUpdateValueChange: handleInputUnidadeMedidaValueChange}
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
