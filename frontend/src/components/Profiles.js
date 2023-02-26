import React from "react";
import ProfileCard from "./partials/ProfileCard";
import { Grid } from "@mui/material";
import "./css/Profiles.css";

const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";
const baseURL = `${apiRoot}/api/users`;

export default function Profiles(props) {
  const [profiles, setProfiles] = React.useState([]);

  const getData = async () => {
    const data = await fetch(baseURL).then((response) => response.json());
    setProfiles(data);
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {profiles.length > 0 ? (
        <Grid container spacing={2}>
          {profiles.map((profile, i) => (
            <Grid item key={i} xs={12} sm={6} md={6} lg={4}>
              <ProfileCard profile={profile} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="loading">Loading profiles...</div>
      )}
    </div>
  );
}
