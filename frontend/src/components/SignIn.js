import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getCookie } from "./partials/csrftoken";

export default function SignIn({ signedInUser, setSignedInUser }) {
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: "",
      password: "",
    }
  );
  const [showPassword, setShowPassword] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleInput = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setFormInput({ [name]: value });
  };

  const handlePassword = (evt) => {
    setFormInput({ password: evt.target.value });
  };

  const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  // const apiRoot = "http://localhost:8000";
  const baseURL = `${apiRoot}/api/login_user`;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let data = {
      username: formInput.username,
      password: formInput.password,
    };

    const resData = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
      mode: "cors",
    }).then((response) => response.json());
    console.log(data);
  };

  return (
    <>
      {!signedInUser && (
        <Box
          className="signIn"
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="User Name"
            name="username"
            variant="outlined"
            required
            onChange={handleInput}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor={`outlined-adornment-password`}>
              Password
            </InputLabel>
            <OutlinedInput
              id={`outlined-adornment-password`}
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handlePassword}
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
          <Button type="submit" variant="contained">
            Sign In
          </Button>
          <Link to={"/signup"} underline="hover">
            Sign Up
          </Link>
        </Box>
      )}
      {signedInUser && <h1>User name</h1>}
    </>
  );
}
