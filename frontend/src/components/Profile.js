import * as React from "react";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import ProfileCard from "./partials/ProfileCard";
import FormGrid from "./partials/FormGrid";
import { useSelector } from "react-redux";

export default function EditProfile(props) {
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log("user id from edit profile", userData.user.id);

  const baseURL = `https://sea-turtle-app-zggz6.ondigitalocean.app/api/users/${userData.user.id}`;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {userData ? (
        <Box
          sx={{ "& > :not(style)": { m: "40px auto", width: "50ch" } }}
          noValidate
          autoComplete="off"
        >
          <ProfileCard profile={userData.user} />
          <FormGrid style={{ margin: "40px auto" }} />
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
