import Button from "@mui/material/Button";

import Password from "./Password";
import PickList from "./PickList";
import Multiline from "./Multiline";
import FileUpload from "./FileUpload";
import { Grid, TextField } from '@mui/material';

export default function FormGrid() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField id="outlined-basic-1" label="First Name" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic-2" label="Last Name" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic-3" label="Email" variant="outlined" />
      </Grid>
       <Grid item xs={6}>
            <TextField id="outlined-basic-4" label="User Name" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
            <TextField id="outlined-basic-5" label="City" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
            <PickList />
        </Grid>
        <Grid item xs={12}> 
            <Multiline className="shortBio" default="Enter a short bio here" label="Short Bio" />
        </Grid>
        <Grid item xs={12}>
            <Multiline className="longBio" default="Enter a detailed biography here" label="Full Bio" />
        </Grid>
        <Grid item xs={6}>
            <Password id="pw1"/> 
        </Grid>
        <Grid item xs={6}>
            <Password label="Repeat Password" id="pw2"/>
        </Grid>
        <Grid item xs={12}>
            <FileUpload />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained">Sign Up</Button>
        </Grid>
    </Grid>
  );
}