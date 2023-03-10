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
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const userData = useSelector((state) => state.user);
  const [tempUser, setTempUser] = React.useState({});
  const [password, setPassword] = React.useState("");
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      first_name: "",
      last_name: "",
      email: "",
      zipcode: "",
      username: "",
      password: "",
    }
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/users";

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let data = { ...formInput, password };
    console.log("data", data);
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(data),
      });
      const userData = await response.json();
      console.log("Success! userData", userData);

      setTempUser(userData);
      console.log("tempUser", tempUser);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("localStorage", localStorage.getItem("user"));
      dispatch(setUserProfile(userData));
      dispatch(setSignedIn(true));
      navigate("/profile");
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  return (
    <>
      <div>
        <Box
          className="signIn"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch", background: "#FFFF" },
          }}
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
            id="zip-textfield"
            label="Zip Code"
            name="zipcode"
            type="number"
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
          <Password onPasswordChange={handlePasswordChange} />
          <Button
            type="submit"
            variant="contained"
            style={{ background: "#1976D2" }}
          >
            Sign Up
          </Button>
        </Box>
      </div>
    </>
  );
}
