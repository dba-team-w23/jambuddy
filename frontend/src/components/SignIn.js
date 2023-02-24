import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import { Link } from "react-router-dom";
import Posts from "./Posts";
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
      email: "",
      password: "",
    }
  );
  const [showPassword, setShowPassword] = React.useState(false);

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

  const apiRoot = "http://localhost:8088";
  const baseURL = `${apiRoot}/api/users`;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let data = {
      username: formInput.username,
      email: formInput.email,
      password: formInput.password,
    };

    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      // change to no-cors if there are still cors errors in production
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        console.log("success", JSON.stringify(response));
        setSignedInUser(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("response obj: ", error.response);
      });
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
          <TextField
            id="outlined-basic-2"
            label="Email"
            name="email"
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
      {signedInUser && <Posts />}
    </>
  );
}
