import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import Password from "./partials/Password";
import PickList from "./partials/PickList";
import Multiline from "./partials/Multiline";
import FileUpload from "./partials/FileUpload";

export default function EditProfile() {

  return (
    <>
      <Box
        className="editProfile"
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic-1" label="First Name" variant="outlined" />
        <TextField id="outlined-basic-2" label="Last Name" variant="outlined" />
        <TextField id="outlined-basic-3" label="Email" variant="outlined" />
        <TextField id="outlined-basic-4" label="User Name" variant="outlined" />
        <TextField id="outlined-basic-5" label="City" variant="outlined" />
        <PickList />
        <Multiline default="Enter a short bio here" label="Short Bio" />
        <Multiline default="Enter a detailed biography here" label="Full Bio" />
        <Password id="pw1"/> 
        <Password label="Repeat Password" id="pw2"/>
        <FileUpload />
        <Button variant="contained">Sign Up</Button>
      </Box>
    </>
  );
}
