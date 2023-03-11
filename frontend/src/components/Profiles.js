import React from "react";
import ProfileCard from "./partials/ProfileCard";
import { Grid } from "@mui/material";
import "./css/Profiles.css";
import ProfileSearch from "./ProfileSearch";

const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";
const baseURL = `${apiRoot}/api/users`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Profiles(props) {
  const query = useQuery();

  const [profiles, setProfiles] = React.useState([]);

  const getData = async () => {
    const instruments = query.get("instrument_ids");
    const genres = query.get("genre_ids");
    const levels = query.get("experience_levels");

    const url = new URL(baseURL);

    if (instruments) {
      url.searchParams.append('instrument_ids', instruments);
    }
    if (genres) {
      url.searchParams.append('genre_ids', genres);
    }
    if (levels) {
      url.searchParams.append('experience_levels', levels);
    }

    const data = await fetch(url.toString()).then((response) => response.json());
    setProfiles(data);
  };

 React.useEffect(() => {
  getData();
}, [props.location.search]);

  return (
    <div>
      <ProfileSearch profiles={profiles} setFilteredProfiles={setProfiles} />
      <br/>
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
