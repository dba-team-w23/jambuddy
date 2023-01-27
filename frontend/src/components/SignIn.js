import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './css/SignIn.css'
import { Link } from 'react-router-dom';
import Password from './partials/Password';


export default function SignIn() {

  return ( 
<><p>Sign In will show up at the root for non-logged in users</p>
<p>For logged-in users, this page will show the "feed" of posts or profiles</p>
    <Box className="signIn" component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off"  > 
        <TextField id="outlined-basic" label="User Name" variant="outlined" />

        <Password />
        <Button variant="contained" >
                Sign In
                </Button>
                <Link to={'/signup' } underline="hover">Sign Up</Link>
    </Box>
    </>
  );
}