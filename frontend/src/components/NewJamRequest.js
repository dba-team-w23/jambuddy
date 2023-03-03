import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import PickList from "./partials/PickList";
import axios from "axios";
import { allStates } from "./partials/variables";

const BASE_URL = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/";

const JamRequestForm = () => {
  const [instruments, setInstruments] = useState([]);
  const [genres, setGenres] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instrumentsResponse, genresResponse, experienceLevelsResponse] =
          await Promise.all([
            axios.get(BASE_URL + "instruments"),
            axios.get(BASE_URL + "musicgenres"),
            axios.get(BASE_URL + "experiencelevels"),
          ]);

        setInstruments(instrumentsResponse.data);
        setGenres(genresResponse.data);
        setExperienceLevels(experienceLevelsResponse.data);

        console.log(instrumentsResponse.data);
        console.log(genresResponse.data);
        console.log(experienceLevelsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(BASE_URL + "jamrequests", {
        userid: 1,
        instrumentid: selectedInstruments,
        genreid: selectedGenres,
        location,
        exp_level: selectedExperienceLevel,
      });

      // Show success message
    } catch (error) {
      console.error(error);
      // Show error message
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="border-4 rounded p-5 mb-4">
      <h2 className="text-lg text-center mb-4">Make a Jam Request</h2>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          className="mb-4"
          multiple
          id="instrument-select"
          options={instruments}
          getOptionLabel={(option) => option.name}
          defaultValue={[]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Instruments Needed"
              placeholder="Instruments"
            />
          )}
        />
        <Autocomplete
          className="mb-4"
          multiple
          id="genres-needed"
          options={genres}
          getOptionLabel={(option) => option.genre}
          defaultValue={[]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Genres in Jam"
              placeholder="Genres"
            />
          )}
        />
        <Autocomplete
          className="mb-4"
          multiple
          id="experience-levels"
          options={experienceLevels}
          getOptionLabel={(option) => option.level}
          defaultValue={[]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Experience Levels Welcomed"
              placeholder="Experience Levels"
            />
          )}
        />

        <input
          className="border border-slate-300 hover:border-black rounded p-3 mb-4 focus:border-blue-800 focus:ring-2 focus:outline-none"
          type="date"
          id="jamdate"
          name="jamdate"
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-5"
              name="city"
              label="City"
              variant="outlined"
              value=""
              width="50%"
            />
          </Grid>
          <Grid item xs={3}>
            <PickList label="State" name="state" list={allStates} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default JamRequestForm;
