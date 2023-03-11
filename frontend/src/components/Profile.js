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
import { ProfileClipLinks } from "./ProfileClipLinks";
import { Grid } from "@mui/material";

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
        <Grid container rowSpacing={1} columnSpacing={2} xs={12}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileCard profile={userData.user} />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileClipLinks />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <FormGrid style={{ margin: "40px auto" }} />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <NewJamRequest />
          </Grid>
        </Grid>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
