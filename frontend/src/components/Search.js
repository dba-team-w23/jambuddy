import React, { useState } from "react";
import SearchCard from "./partials/SearchCard";
import Grid from "@mui/material/Grid";
import { Button, Select, InputLabel, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import "./css/Search.css";
import { useSelector } from "react-redux";

const Search = () => {
  const userData = useSelector((state) => state.user);
  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [expLevelOptions, setExpLevelOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [searchConducted, setSearchConducted] = useState(false);
  const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";

  React.useEffect(() => {
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
    const fetchInitialJamRequests = async () => {
      try {
        const payload = { searcher_profile_id: userData.user.id };
        console.log(payload);
        const res = await fetch(`${apiRoot}/api/searchjamrequests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        console.log(data);
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInstruments();
    fetchGenres();
    fetchExperiences();
    fetchInitialJamRequests();
  }, []);

  const [distanceToTravel, setDistanceToTravel] = useState("");
  const [requestPlaced, setRequestPlaced] = useState("");
  const [instrument, setInstrument] = useState("");
  const [genre, setGenre] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const search = async () => {
    try {
      const payload = {};

      if (instrument !== "") payload.instrumentid = parseInt(instrument);
      if (genre !== "") payload.genreid = parseInt(genre);
      if (experienceLevel !== "") payload.explevel = parseInt(experienceLevel);

      if (requestPlaced === "last7days") payload.daysback = 7;
      if (requestPlaced === "last2weeks") payload.daysback = 14;
      if (requestPlaced === "lastmonth") payload.daysback = 30;
      if (requestPlaced === "last6months") payload.daysback = 180;
      if (requestPlaced === "lastyear") payload.daysback = 365;

      payload.searcher_profile_id = userData.user.id;

      if (distanceToTravel !== "") payload.distance_miles = distanceToTravel;

      const res = await fetch(`${apiRoot}/api/searchjamrequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResults(data);
      setSearchConducted(true);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    console.log("instrument", instrument);
  }, [instrument]);

  return (
    <div className="jam-buddies-search bg-blue-50 w-full">
      <div className="jam-buddies-search mb-5">
        <h1>Search Open Jam Requests</h1>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="jr-search-instrument">Instrument</InputLabel>
              <Select
                select
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
                select
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
                select
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

          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <TextField
              id="outlined-basic"
              label="Distance in miles"
              type="number"
              variant="outlined"
              value={distanceToTravel}
              onChange={(e) => setDistanceToTravel(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <FormControl fullWidth>
              <InputLabel id="search-request-placed">
                Request Placed:
              </InputLabel>
              <Select
                labelId="search-request-placed"
                id="request-placed"
                value={requestPlaced}
                label="Request Placed:"
                onChange={(e) => setRequestPlaced(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="last7days">Last 7 days</MenuItem>
                <MenuItem value="last2weeks">Last 2 weeks</MenuItem>
                <MenuItem value="lastmonth">Last month</MenuItem>
                <MenuItem value="last6months">Last 6 months</MenuItem>
                <MenuItem value="lastyear">Last year</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <Button
              variant="contained"
              className="bg-blue-500 rounded text-white cursor-pointer text-xl py-1 px-4 hover:bg-blue-700 transition-all "
              onClick={search}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={4}>
        {results.length > 0 ? (
          results.map((result) => (
            <Grid item key={result.id} xs={12} sm={6} md={6} lg={4} xl={3}>
              <SearchCard
                post={result}
                instruments={result.instruments}
                genres={result.genres}
                experienceLevels={result.exp_level}
              />
            </Grid>
          ))
        ) : (
          <div className="text-center">
            <h2>No results found</h2>
            <p>Try broadening your search criteria</p>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default Search;
