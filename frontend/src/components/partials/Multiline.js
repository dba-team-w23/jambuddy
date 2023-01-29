import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Multiline(props) {
    let label=props.label
    let id=props.id


  return (
      <div>
        <TextField
          fullWidth
            id={id}
            label={label}
            multiline
            maxRows={16}
          />
      </div>
  );
}
