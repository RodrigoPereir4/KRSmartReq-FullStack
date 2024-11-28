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

export default function NovoUsuarioDialog(props) {

  const [listaSetores, setListaSetores] = useState([]);
  const [listaSetoresNome, setListaSetoresNome] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setorNome, setSetorNome] = useState('');

  const [emailView, setEmailView] = useState('');
  const [passwordView, setPasswordView] = useState('');
  const [setorNomeView, setSetorNomeView] = useState('');

  const [emailUpdate, setEmailUpdate] = useState('');
  const [passwordUpdate, setPasswordUpdate] = useState('');
  const [setorNomeUpdate, setSetorNomeUpdate] = useState('');

  const [inputSetorNomeValue, setInputSetorNomeValue] = useState('');
  const [inputSetorNomeUpdateValue, setInputSetorNomeUpdateValue] = useState('');

  const [erros, setErros] = useState([]);

  const verificarAtributosNullos = (email, password, setor) =>{
    console.log(email);
    console.log(password);
    console.log(setor);
    const atributosParaVerificar = [
      { valor: email, campo: 'Email' },
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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

  //UPDATE
  const handleEmailUpdateChange = (e) => {
    setEmailUpdate(e.target.value);
    setEmail(e.target.value);
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
      setEmailView(props.view[0].email);  // Acessa o email do primeiro item
      setPasswordView(props.view[0].password);  // Acessa a senha do primeiro item
      setSetorNomeView(props.view[0].setorNome);  // Acessa o primeiro item do array
    } else {
      console.log("props.view não é um array válido ou está vazio");
    }
  }, [props.view]);

  useEffect(() => {
    // Verifique se props.view é um array e não está vazio
    if (Array.isArray(props.update) && props.update.length > 0) {
      setEmailUpdate(props.update[0].email);  // Acessa o email do primeiro item
      setPasswordUpdate(props.update[0].password);  // Acessa a senha do primeiro item
      setSetorNomeUpdate(props.update[0].setorNome);  // Acessa o primeiro item do array]

      //Padrões se não preencher
      setEmail(props.update[0].email);
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

            if(!verificarAtributosNullos(email, password, setorNome)){
              alert("Preencha os campos corretamente!")
            }else {
              props.handleCloseDialog({email, password, setorNome});
              if(!props.update){
                setEmail('');
                setPassword('');
                setSetorNome('');
              }
            }
          },
        }}
      >
        {props.view ? <DialogTitle>Visualizar usuário</DialogTitle> : props.update? <DialogTitle>Editar usuário</DialogTitle> : <DialogTitle>Inserir Novo usuário</DialogTitle>}
        
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="emailText"
            value={emailView !== '' ? emailView : emailUpdate !== '' ? emailUpdate : email}
            onChange={props.update ? handleEmailUpdateChange : handleEmailChange}
            name="email"
            label="Email"
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
            name="setorNome"
            label="Selecione o Setor do usuário!"
            value={setorNomeView !== '' ? setorNomeView : setorNomeUpdate !== '' ? setorNomeUpdate: setorNome}
            listarItens={listaSetoresNome}
            inputValue={props.update ? inputSetorNomeUpdateValue : inputSetorNomeValue} 
            handleValueChange={props.update ? handleSetorNomeUpdateValueChange: handleSetorNomeValueChange} 
            handleInputValueChange={props.update ? handleInputSetorNomeUpdateValueChange: handleInputSetorNomeValueChange}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" style={{display: props.view ? 'none' : 'flex'}}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
