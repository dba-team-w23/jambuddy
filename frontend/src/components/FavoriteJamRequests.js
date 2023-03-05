import React from "react";
import { useEffect } from "react";
import FavoriteJamsCard from "./partials/FavoriteJamsCard";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useSelector } from "react-redux";

export default function JamRequests() {
  const userData = useSelector((state) => state.user);
  const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";

  const jamApi = `${apiRoot}/api/userfavejamreqs/${userData.user.id}`;

  const [jamRequests, setJamRequests] = React.useState([]);
  const [instruments, setInstruments] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [experienceLevels, setExperienceLevels] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(jamApi);
        console.log("jamrequests response", response);
        setJamRequests(response.data.jamrequests);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("jamRequests", jamRequests);
  }, [jamRequests]);

  return (
    <Grid container spacing={6}>
      {jamRequests.map((request, i) => {
        return (
          <Grid key={i} item xs={6}>
            <FavoriteJamsCard
              key={i + 1000}
              post={request}
              instruments={instruments}
              genres={genres}
              experienceLevels={experienceLevels}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
