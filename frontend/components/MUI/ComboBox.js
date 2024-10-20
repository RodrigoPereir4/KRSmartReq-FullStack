import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { listarItensComboBox } from '@/services/RequisicaoService';

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function ComboBox() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const handleOpen = async () => {
    const response = await listarItensComboBox();

    if(response.length === 0){
      setOpen(false);
      alert("Não existe nenhum item nessa categoria!");
    } else {
        setOpen(true);
      (async () => {
        setLoading(true);
        await sleep(1e3); // For demo purposes.
        setLoading(false);

        setOptions([...response]);
      })();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
    if(newValue != null){
      alert(newValue);
    }
  };

  const handleInputValueChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      value={value}
      onChange={handleValueChange}
      inputValue={inputValue}
      onInputChange={handleInputValueChange}

      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option === value} //Comparar valor digitado
      getOptionLabel={(option) => option} //Titulo de exibição enquanto procura
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
} 