import * as React from "react";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import ProfileCard from './partials/ProfileCard';
import FormGrid from "./partials/FormGrid";


export default function EditProfile(props) {
  const { signedIn, userId } = props;
  const [user, setUser] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  
  const baseURL = `https://dbajamteam.pythonanywhere.com/api/users/${userId}/`;
  const tempUser = {id: 5, username: "dkeech", password: "123", lastlogin: "", fname: "Dan", lname: "Keech", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: "https://res.cloudinary.com/dg2srlhdk/image/upload/v1676075859/dan_k_cmwsxh.png"}


//   React.useEffect(() => {
//     async function getData() {
//       const userData = await axios.get(baseURL);
//       setUser(userData.data);
// }
//     getData();

//   }, []);


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
      <ProfileCard profile={tempUser} />
      <FormGrid style={{ margin: "0 auto"}} />
    </Box>
    </>
  );
}

