import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import Password from "./partials/Password";

export default function SignUp() {
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
    }
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(
      `Submitting Name ${formInput.firstName} ${formInput.lastName} ${formInput.email} ${formInput.userName} ${formInput.password}`
    );

    let data = { formInput };

    fetch("/api/users", { /* need api route*/
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
    console.log(name, newValue)
  };


  return (
    <>
      <p>
        Sign Up will take the user to a{" "}
        <a href="/profile">Create/Edit Profile</a> page
      </p>
      <Box
        className="signIn"
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >

        <TextField
          id="firstName-textfield"
          name="firstName"
          label="First Name"
          variant="outlined"
          onChange={handleInput}
        />
        <TextField 
          id="lastName-textfield" 
          label="Last Name" 
          name="lastName"
          variant="outlined"
          onChange={handleInput} 
          />
        <TextField
          id="email-textfield"
          label="Email"
          name="email"
          type="email"
          required
          variant="outlined"
          onChange={handleInput}
        />
        <TextField 
          id="outlined-basic-4" 
          label="User Name" 
          name="userName"
          variant="outlined" 
          onChange={handleInput}
          />
        <Password />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>

      </Box>
    </>
  );
}
