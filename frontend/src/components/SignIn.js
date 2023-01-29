import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import { Link } from "react-router-dom";
import Password from "./partials/Password";
import Posts from "./Posts";

export default function SignIn() {
  const [signedIn, setSignedIn] = React.useState(false);
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      userName: "",
      password: "",
    }
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting userName ${formInput.userName} ${formInput.password}`);
    let data = { formInput };

    fetch("/api/users", {     /* need api route*/ 
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log("success", JSON.stringify(response)))
      .catch((error) => console.error("Error:", error));
  };

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
    console.log(name, newValue);
  };

  return (
    <>
      <p>{signedIn ? "Signed In" : "Signed Out"}</p>
      {!signedIn && (
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
            name="userName"
            variant="outlined"
            required
            onChange={handleInput}
          />

          <Password />
          <Button 
            type="submit"
            variant="contained"
            >Sign In</Button>
            <Link to={"/signup"} underline="hover">
              Sign Up
            </Link>
        </Box>

      )}
      {signedIn && <Posts />}
    </>
  );
}
