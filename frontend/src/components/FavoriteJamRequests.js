import React from "react";
import { useEffect } from "react";
import FavoriteJamsCard from "./partials/FavoriteJamsCard";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useSelector } from "react-redux";

export default function FavoriteJamRequests(userId) {
  const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";

  const jamApi = `${apiRoot}/api/userfavejamreqs/${userId.id}`;
  const [jamRequests, setJamRequests] = React.useState([]);
  const likedJams = useSelector((state) => state.jam.likedJams);
  console.log("likedJams from FavoriteJamRequests", likedJams);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(jamApi);
        setJamRequests(response.data.jamrequests);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={6}>
      {jamRequests.map((request, i) => {
        console.log(request);
        return (
          <Grid key={i} item xs={6}>
            <FavoriteJamsCard key={i + 1000} post={request} />
          </Grid>
        );
      })}
    </Grid>
  );
}
