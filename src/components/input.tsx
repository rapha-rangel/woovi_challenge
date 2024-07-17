import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ChangeEvent} from "react";
import { styled } from '@mui/material/styles'

interface InputTextTypes {
  value: string
  name: string
  label: string
  type: string
  maxLength: number
  error:boolean
  helperText: string | false
  handleChange:(e:ChangeEvent<HTMLInputElement>)=> void
}

const CssTextField = styled(TextField)({
  '& label':{
    fontSize: "18px",
    fontFamily: 'inherit',
    fontWeight: 600,
    color: '#4D4D4D',
  },
  '& input':{
    fontSize: "18px",
    fontFamily: 'inherit',
    padding:'20px',
  },
  '& label.Mui-focused': {
    color: '#4D4D4D',
    fontSize: '18px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #E5E5E5',
      borderRadius: '8px',
      fontFamily: 'inherit',
      color: '#4D4D4D',
      fontWeight: 600,
    },
    '&:hover fieldset': {
      borderColor: '#03D69D',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#03D69D',
    },
  },
});


export default function Input({value,name, label, handleChange, type, maxLength, error, helperText}:InputTextTypes) {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': {  width: '100%' } }}
      noValidate
      autoComplete="off"
    >
      <CssTextField  
        label={label} 
        variant="outlined" 
        name={name}
        value={value}
        onChange={handleChange}
        inputProps={{maxLength:maxLength}}
        type={type}
        error={error}
        helperText={helperText}
        />
    </Box>
  );
}