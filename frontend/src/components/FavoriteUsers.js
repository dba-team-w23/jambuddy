import React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProfileCardMini from "./partials/ProfileCardMini";
import axios from "axios";
import { useSelector } from "react-redux";

export default function FavoriteUsers(userId) {
  const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  console.log("favorite Users userid", userId.id);
  const favUserApi = `${apiRoot}/api/userfaveprofiles/${userId.id}`;

  const [favoriteUsers, setFavoriteUsers] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(favUserApi);
        console.log("fave users", response.data.profiles);
        setFavoriteUsers(response.data.profiles);
        // console.log("fave users", favoriteUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={6}>
      {favoriteUsers.map((profile, i) => {
        return (
          <Grid key={i} item xs={6}>
            <ProfileCardMini key={profile.id} profile={profile} />
          </Grid>
        );
      })}
    </Grid>
  );
}
