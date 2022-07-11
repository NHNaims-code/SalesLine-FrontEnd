import { TextField } from '@mui/material'
import React from 'react'

export default function CustomTextField({id, name, onChange, required, type="text", label, placeholder, value}) {
  return (
    <TextField 
      sx={{ marginTop: '15px'}} 
      onChange={onChange} 
      name={name} 
      label={label} 
      type={type}
      variant="standard"
      defaultValue={value}
      required={required}/>
  )
}
