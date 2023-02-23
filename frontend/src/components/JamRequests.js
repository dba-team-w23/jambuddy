import React from "react";
import { useEffect } from "react";
import BasicCard from "./partials/BasicCard";
import Grid from "@mui/material/Grid";

// const apiRoot = 'https://sea-turtle-app-zggz6.ondigitalocean.app'
const apiRoot = "http://localhost:8088";

const jamApi = `${apiRoot}/api/jamrequests/`;

const usersApi = `${apiRoot}/api/users/`;

export default function JamRequests() {
  const [jamRequests, setJamRequests] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    async function getData() {
      const [jamResponse, userResponse] = await Promise.all(
        [jamApi, usersApi].map((url) => fetch(url).then((res) => res.json()))
      );
      setJamRequests(jamResponse);
      setUsers(userResponse);
    }
    getData();
  }, []);
  console.log(users);
  return (
    <Grid container spacing={3}>
      {jamRequests.map((request, i) => {
        const thisUser = users.find((user) => user.id === request.userid);
        const userFirst = thisUser.fname;
        const userLast = thisUser.lname;
        const userName = `${userFirst} ${userLast}`;

        return (
          <Grid item key={i} xs={3}>
            <BasicCard request={request} contact={userName} />
          </Grid>
        );
      })}
    </Grid>
  );
}
