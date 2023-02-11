import * as React from "react";
import Box from "@mui/material/Box";
import axios from 'axios';
import "./css/SignIn.css";
import ProfileCard from './partials/ProfileCard';
import FormGrid from "./partials/FormGrid";


export default function EditProfile(props) {
  const { signedIn, userId } = props;
  const [user, setUser] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  
  const baseURL = `https://dbajamteam.pythonanywhere.com/api/users/${userId}/`;

  React.useEffect(() => {
    async function getData() {
      const userData = await axios.get(baseURL);
      setUser(userData.data);
      setIsLoading(false);
    }
    getData();

  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: "0 auto", width: "50ch" } }}
      noValidate
      autoComplete="off"
    >
      <ProfileCard profile={user} />
      <FormGrid style={{ margin: "0 auto"}} />
    </Box>
    </>
  );
}

