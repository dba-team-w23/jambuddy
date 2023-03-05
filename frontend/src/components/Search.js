import React, { useState } from "react";

const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";

import "./css/Search.css";

const Search = () => {
  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [expLevelOptions, setExpLevelOptions] = useState([]);

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
    fetchInstruments();
    fetchGenres();
    fetchExperiences();
  }, []);

  const [distanceToTravel, setDistanceToTravel] = useState("");
  const [requestPlaced, setRequestPlaced] = useState("");
  const [instrument, setInstrument] = useState("");
  const [genre, setGenre] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const search = async () => {
    try {
      const payload = {};

      if (instrument !== '')   payload.instrumentid = parseInt(instrument);
      if (genre !== '')        payload.genreid = parseInt(genre);
      if (experienceLevel !== '') payload.explevel = parseInt(experienceLevel);

      if (requestPlaced === "last7days")      payload.daysback = 7;
      if (requestPlaced === "last2weeks")    payload.daysback = 14;
      if (requestPlaced === "lastmonth")     payload.daysback = 30;
      if (requestPlaced === "last6months")   payload.daysback = 180;
      if (requestPlaced === "lastyear")      payload.daysback = 365;

      if (distanceToTravel !== '') payload.distance_miles = distanceToTravel;

      const res = await fetch(`${apiRoot}/api/searchjamrequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div class="jam-buddies-search">
    <h1>Search for Jam Buddies</h1>
    <label htmlFor="instrument">Instrument:</label>
    <select
        id="instrument"
        value={instrument}
        onChange={(e) => setInstrument(e.target.value)}
    >
        <option value="">Select an instrument</option>
        {instrumentOptions.map((opt) => (
        <option key={opt.id} value={opt.id}>
            {opt.name} ({opt.type})
        </option>
        ))}
    </select>
    <br />
    <label htmlFor="genre">Music Genre:</label>
    <select
        id="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
    >
        <option value="">Select a genre</option>
        {genreOptions.map((opt) => (
        <option key={opt.id} value={opt.id}>
            {opt.genre}
        </option>
        ))}
    </select>
    <br />
    <label htmlFor="experienceLevel">Experience Level:</label>
    <select
        id="experienceLevel"
        value={experienceLevel}
        onChange={(e) => setExperienceLevel(e.target.value)}
    >
        <option value="">Select an experience level</option>
        {expLevelOptions.map((opt) => (
        <option key={opt.id} value={opt.id}>
            {opt.level}
        </option>
        ))}
    </select>
    <br />
    <label htmlFor="distance">Distance to Travel:</label>
    <input
        id="distance"
        type="number"
        min="1"
        value={distanceToTravel}
        onChange={(e) => setDistanceToTravel(e.target.value)}
    />
    <br />
    <label htmlFor="requestPlaced">Request Placed:</label>
    <select
        id="requestPlaced"
        value={requestPlaced}
        onChange={(e) => setRequestPlaced(e.target.value)}
    >
        <option value="">Select a time range</option>
        <option value="All">All</option>
        <option value="last7days">Last 7 days</option>
        <option value="last2weeks">Last 2 weeks</option>
        <option value="lastmonth">Last month</option>
        <option value="last6months">Last 6 months</option>
        <option value="lastyear">Last year</option>
    </select>
    <br />
    <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;