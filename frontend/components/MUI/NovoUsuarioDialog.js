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

  const [setorNome, setSetorNome] = useState('');
  const [listaSetores, setListaSetores] = useState([]);
  const [listaSetoresNome, setListaSetoresNome] = useState('');

  const [inputSetorNomeValue, setInputSetorNomeValue] = useState('');

  const [erros, setErros] = useState([]);

  const verificarAtributosNullos = (email, password, setor) =>{
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


  const handleSetorNomeValueChange = (event, newValue) => {
    setSetorNome(newValue);
    if(newValue != null){
      alert(newValue);
    }
};

const handleInputSetorNomeValueChange = (event, newInputValue) => {
    setInputSetorNomeValue(newInputValue);
};

  const handleClose = () => {
    props.setOpen(false);
  }

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
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            const password = formJson.password;

            if(!verificarAtributosNullos(email, password, setorNome)){
              alert("Preencha os campos corretamente!")
            }else {
              console.log(listaSetoresNome);
              props.handleCloseDialog({email, password, setorNome});
            }
          },
        }}
      >
        <DialogTitle>Inserir Novo usuário</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="emailText"
            name="email"
            label="Email"
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
            name="password"
            type="password"
            label="Senha"
            fullWidth
            rows={4}
          />

          <ComboBox
            sx={{
              marginTop: 2, 
            }}
            name="setorNome"
            label="Selecione o Setor do usuário!"
            value={setorNome}
            listarItens={listaSetoresNome}
            inputValue={inputSetorNomeValue} 
            handleValueChange={handleSetorNomeValueChange} 
            handleInputValueChange={handleInputSetorNomeValueChange}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Enviar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
