import React from "react";
import { useEffect } from "react";
import BasicCard from "./partials/BasicCard";
import Grid from "@mui/material/Grid";
import axios from "axios";

const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/";

const jamApi = `${apiRoot}/api/jamrequests`;

export default function JamRequests() {
  const [jamRequests, setJamRequests] = React.useState([]);
  const [instruments, setInstruments] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [experienceLevels, setExperienceLevels] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jamResponse,
          instrumentsResponse,
          genresResponse,
          experienceLevelsResponse,
        ] = await Promise.all([
          axios.get(apiRoot + "jamrequests"),
          axios.get(apiRoot + "instruments"),
          axios.get(apiRoot + "musicgenres"),
          axios.get(apiRoot + "experiencelevels"),
        ]);
        setJamRequests(jamResponse.data);
        setInstruments(instrumentsResponse.data);
        setGenres(genresResponse.data);
        setExperienceLevels(experienceLevelsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log("JR instruments", instruments);
    console.log("JR genres", genres);
    console.log("JR experienceLevels", experienceLevels);
  }, [instruments, genres, experienceLevels]);

  return (
    <Grid container spacing={6}>
      {jamRequests.map((request, i) => {
        return (
          <Grid key={i} item xs={6}>
            <BasicCard
              key={i * 1000 - 1}
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
