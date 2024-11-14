import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ObservacaoDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

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
            const observacao = formJson.observacao;
            props.handleCloseDialog(observacao);
          },
        }}
      >
        <DialogTitle>Observação</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Por favor, informe o motivo da diferença na quantidade que está sendo enviada. Sua resposta nos ajudará a entender melhor a situação e a tomar as devidas providências.
          </DialogContentText>
          <TextField
            sx={{
              marginTop: 2, 
            }}
            autoFocus
            required
            margin="dense"
            id="text"
            name="observacao"
            label="Descreva o motivo"
            multiline
            fullWidth
            rows={4}
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
