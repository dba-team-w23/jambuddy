import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import Password from "./partials/Password";

export default function SignUp() {

  return (
    <>
      <p>Sign Up will take the user to a <a href="/profile">Create/Edit Profile</a> page</p>
      <Box
        className="signIn"
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="First Name" variant="outlined" />
        <TextField id="outlined-basic" label="Last Name" variant="outlined" />
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="User Name" variant="outlined" />
        <Password />
        <Button variant="contained">Sign Up</Button>
      </Box>
    </>
  );
}
