import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Password({label}) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [ password, setPassword ] = React.useState("");
    const passwordLabel = label || "Password asdf   "

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleChange = (event) => {
        setPassword(event.target.value)
        
    }


    return(
        <FormControl variant="outlined">
        <InputLabel htmlFor={`outlined-adornment-${passwordLabel[0]}`}>{passwordLabel}</InputLabel>
        <OutlinedInput
            id={`outlined-adornment-${passwordLabel[0]}`}
            label={passwordLabel}
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleChange}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
        }
        
        />
        </FormControl>
    )
}

