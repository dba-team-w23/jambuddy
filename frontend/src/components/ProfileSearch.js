import React, { useState, useEffect } from "react";
import {
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import "./css/Search.css";
import ProfileCard from "./partials/ProfileCard";
import { useSelector } from "react-redux";

const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";

export default function Search({}) {
  const userData = useSelector((state) => state.user);
  const [instrument, setInstrument] = useState("");
  const [genre, setGenre] = useState("");
  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [expLevelOptions, setExpLevelOptions] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");

  // State hook for search results and some helper hooks
  const [searchConducted, setSearchConducted] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async (payload) => {
    try {
      const res = await fetch(`${apiRoot}/api/searchusers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setProfiles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInstruments = async () => {
    try {
      const res = await fetch(`${apiRoot}/api/instruments`);
      const data = await res.json();
      setInstrumentOptions(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchGenres = async () => {
    try {
      const res = await fetch(`${apiRoot}/api/musicgenres`);
      const data = await res.json();
      setGenreOptions(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchExperiences = async () => {
    try {
      const res = await fetch(`${apiRoot}/api/experiencelevels`);
      const data = await res.json();
      setExpLevelOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchInstruments();
    fetchGenres();
    fetchExperiences();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // prevent form submission
    const payload = {
      // set fields on the search payload based on input values
      instrumentid: instrument !== "" ? parseInt(instrument) : undefined,
      genreid: genre !== "" ? parseInt(genre) : undefined,
      explevel: experienceLevel !== "" ? parseInt(experienceLevel) : undefined,
      searcher_profile_id: userData.user.id,
    };
    fetchProfiles(payload);
    setSearchConducted; // perform search
  };

  return (
    <div className="jam-buddies-search my-5 bg-slate-100">
      <form onSubmit={handleSearchSubmit}>
        <Grid container spacing={4} sx={{ marginBottom: "1rem" }}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="jr-search-instrument">Instrument</InputLabel>
              <Select
                id="outlined-basic"
                label="Instrument"
                variant="outlined"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                {instrumentOptions.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.name} ({opt.type})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="jr-search-genre">Music Genre</InputLabel>
              <Select
                id="search-genre"
                label="Music Genre"
                variant="outlined"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                {genreOptions.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="jr-search-exp">Experience Level</InputLabel>
              <Select
                id="search-exp"
                label="Experience Level"
                variant="outlined"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                {expLevelOptions.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <div className="text-center pb-5">
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </div>
      </form>

      {profiles.length > 0 ? (
        // render resulting profiles matching the search criteria
        <Grid container spacing={2}>
          {profiles.map((profile, i) => (
            <Grid item key={i} xs={12} sm={6} md={6} lg={4}>
              <ProfileCard profile={profile} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="loading">
          {searchConducted && profiles.length === 0
            ? "No matching profiles found"
            : ""}
        </div>
      )}
    </div>
  );
}
