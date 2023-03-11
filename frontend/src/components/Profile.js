import * as React from "react";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import ProfileCard from "./partials/ProfileCard";
import FormGrid from "./partials/FormGrid";
import { useSelector } from "react-redux";
import NewJamRequest from "./NewJamRequest";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../features/userSlice";
import { ProfileClipLinks } from "./ProfileClipLinks";

export default function EditProfile(props) {
  const userData = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = React.useState({});
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const baseURL = `https://sea-turtle-app-zggz6.ondigitalocean.app/api/users/${userData.user.id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}`);
        const data = await response.data;
        setUserProfile(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
          {userData.user.note ? (
            <>
            <ProfileClipLinks/>
              <NewJamRequest />
              <FormGrid style={{ margin: "40px auto" }} />
            </>
          ) : (
            <>
              <FormGrid style={{ margin: "40px auto" }} />
              <NewJamRequest />
            </>
          )}
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
