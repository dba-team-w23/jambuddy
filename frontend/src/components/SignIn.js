import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './css/SignIn.css'
import { Link } from 'react-router-dom';
import Password from './partials/Password';
import { Switch } from '@mui/material'
import Posts from './Posts';


export default function SignIn() {
  const [signedIn, setSignedIn] = React.useState(false);

  const handleChange = (e) => {
    setSignedIn(e.target.checked);
  };


  return ( 
    <>
    <Switch checked={signedIn} onChange={handleChange} />
    <p>{signedIn ? "Signed In" : "Signed Out" }</p>
        {!signedIn && <Box className="signIn" component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off"  > 
            <TextField id="outlined-basic" label="User Name" variant="outlined" />

            <Password />
            <Button variant="contained" >
                    Sign In
                    </Button>
                    <Link to={'/signup' } underline="hover">Sign Up</Link>
        </Box>}
        {signedIn && <Posts />}
        </>
  );
}