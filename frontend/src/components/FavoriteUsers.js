import React from "react";
import { useEffect } from "react";
import FavoriteJamsCard from "./partials/FavoriteJamsCard";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useSelector } from "react-redux";

export default function FavoriteUsers(userId) {
  const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  console.log("favorite Users userid", userId.id);
  const jamApi = `${apiRoot}/api/userfaveprofiles/${userId.id}`;

  const [favoriteUserIds, setFavoriteUserIds] = React.useState([]);
  const [favoriteUsers, setFavoriteUsers] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(jamApi);
        setFavoriteUserIds(response.data.profiles);
        console.log("fave users", response.data.profiles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={6}>
      {favoriteUsers.map((request, i) => {
        return (
          <Grid key={i} item xs={6}>
            <FavoriteUsersCard key={i + 1000} post={request} />
          </Grid>
        );
      })}
    </Grid>
  );
}
