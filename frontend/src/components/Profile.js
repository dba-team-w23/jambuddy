import * as React from "react";
import Box from "@mui/material/Box";
import axios from 'axios';
import "./css/SignIn.css";
import Card from './partials/ProfileCard';
import FormGrid from "./partials/FormGrid";

export default function EditProfile(props) {
  const { signedIn, userId } = props;
  console.log("userId", userId)

  const baseURL = `https://dbajamteam.pythonanywhere.com/api/users/${userId}/`;
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

