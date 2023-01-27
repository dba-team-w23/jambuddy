import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Multiline(props) {
    const {label, defaultValue} = props

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
        fullWidth
          id="outlined-multiline-flexible"
          label={label}
          multiline
          maxRows={8}
        />
      </div>

    </Box>
  );
}
