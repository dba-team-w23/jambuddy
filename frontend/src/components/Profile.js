import * as React from "react";
import Box from "@mui/material/Box";
import axios from 'axios';
import "./css/SignIn.css";
import Card from './partials/Card';
import FormGrid from "./partials/FormGrid";

export default function EditProfile(props) {
  const { signedIn, userId } = props;
  console.log("userId", userId)
  
  const baseURL = `https://cors-anywhere.herokuapp.com/https://dbajamteam.pythonanywhere.com/api/users/${userId}/`;
  let user = {}

  const getProfile = async () => {
    const {data} = await axios.get(baseURL);
    user=data;
    console.log(data)
  }
  
  React.useEffect(() => {
      getProfile();
      }, []);

  return (
    <>
    
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: "0 auto", width: "50ch" } }}

      noValidate
      autoComplete="off"
    >
      <Card profile={profile} />
      <FormGrid       style={{ margin: "0 auto"}} />
    </Box>
    </>
  );
}

// temporary user
const profile = {
  "id": 5,
  "username": "jsmith",
  "password": "123",
  "lastlogin": "2023-01-29T05:00:00Z",
  "fname": "John",
  "lname": "Smith",
  "street": "123 Main St",
  "street2": null,
  "city": "Anytown",
  "state": "CA",
  "zipcode": "12345",
  "phone": "555-555-5555",
  "email": "john.smith@example.com",
  "photo": null,
  "note": null,
  "created": "2023-01-29T05:00:00Z"
  }