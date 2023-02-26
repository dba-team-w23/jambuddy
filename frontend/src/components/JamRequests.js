import React from "react";
import { useEffect } from "react";
import BasicCard from "./partials/BasicCard";
import Grid from "@mui/material/Grid";
import axios from "axios";

const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";

const jamApi = `${apiRoot}/api/jamrequests`;
const usersApi = `${apiRoot}/api/users`;

export default function JamRequests() {
  const [jamRequests, setJamRequests] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    Promise.all([fetch(jamApi), fetch(usersApi)])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        setJamRequests(data[0]);
        setUsers(data[1]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <Grid container spacing={3}>
      {jamRequests.map((request, i) => {
        const author = users.find(
          (user) => user.id === request.requestor_profile.id
        );
        const post = {
          id: request.id,
          location: request.location,
          status: request.status,
          instrument: request.instrument.name,
          genre: request.genre.genre,
          exp_level: request.exp_level,
        };

        return (
          <Grid key={i} item xs={3}>
            <BasicCard key={i * 100} post={post} author={author} />
          </Grid>
        );
      })}
    </Grid>
  );
}
