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

  return (
    <Grid container spacing={4} style={{ gridAutoFlow: "dense" }}>
      {jamRequests.map((request, i) => {
        return (
          <Grid item key={i} xs={12} sm={6} md={6} lg={4} xl={3}>
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
