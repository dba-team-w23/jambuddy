import * as React from "react";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import ProfileCard from './partials/ProfileCard';
import FormGrid from "./partials/FormGrid";


export default function EditProfile(props) {
  const { signedIn, userId } = props;
  const [user, setUser] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  
  const baseURL = `https://sea-turtle-app-zggz6.ondigitalocean.app/api/users/${userId}/`;
  
  React.useEffect(() => {
    async function getData() {
      const userData = await fetch(baseURL).then(res => res.json())
      setUser(userData);
      console.log(user)
      setIsLoading(false);
}
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading Profile.js before return...</div>;
  }
  return (
    <>
    {user ? (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: "0 auto", width: "50ch" } }}
      noValidate
      autoComplete="off"
    >
      <ProfileCard profile={user} />
      <FormGrid style={{ margin: "0 auto"}} />
    </Box>
    ) : (
      <div>Loading in Profile.js...</div>
    )
}
    </>
  );
}

