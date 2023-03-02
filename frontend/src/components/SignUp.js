import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import Password from "./partials/Password";
import { getCookie } from "./partials/csrftoken";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../features/userSlice";
import { setSignedIn } from "../features/userSlice";
import { useSelector } from "react-redux";

export default function SignUp() {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const userData = useSelector((state) => state.user);
  const [tempUser, setTempUser] = React.useState({});
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
    }
  );
  const dispatch = useDispatch();
  const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/users";

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let data = formInput;
    console.log("sign up data", data);

    const returnedUser = await fetch(baseURL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error: " + error);
      });
    console.log("returnedUser", returnedUser);
    setTempUser(returnedUser);
  };

  React.useEffect(() => {
    const updateUser = async () => {
      if (!tempUser.id) return;
      localStorage.setItem("user", JSON.stringify(tempUser));
      dispatch(setUserProfile(tempUser));
      dispatch(setSignedIn(true));
      console.log("Sign Up user profile", userData);
      console.log("Sign Up Local storage", localStorage.getItem("user"));
    };
    updateUser();
  }, [tempUser, isSignedIn, dispatch]);

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
          name="first_name"
          label="First Name"
          variant="outlined"
          onChange={handleInput}
        />
        <TextField
          id="lastName-textfield"
          label="Last Name"
          name="last_name"
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
          name="username"
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
