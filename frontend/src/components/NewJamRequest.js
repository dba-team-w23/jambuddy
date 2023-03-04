import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import PickList from "./partials/PickList";
import Button from "@mui/material/Button";
import axios from "axios";
import { allStates } from "./partials/variables";
import { useSelector } from "react-redux";

const BASE_URL = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/";

const JamRequestForm = () => {
  const userData = useSelector((state) => state.user);
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("data", data);
    // data.instruments = selectedInstruments;
    // data.genres = selectedGenres;
    // data.exp_level = selectedExperienceLevel;
    // data.date =
    try {
      await axios.post(BASE_URL + "jamrequests", {
        userid: userData.user.id,
        // instrumentid: selectedInstruments,
        // genreid: selectedGenres,
        // location: ,
        // exp_level: selectedExperienceLevel,
      });

      // Show success message
    } catch (error) {
      console.error(error);
      // Show error message
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setFormInput({ ...formInput, [name]: newValue });
  };
  const handleInstrument = (e, value) => {
    const selectedIds = value.map((instrument) => instrument.id);
    setSelectedInstruments(selectedIds);
  };
  const handleGenre = (e, value) => {
    const selectedIds = value.map((genre) => genre.id);
    setSelectedGenres(selectedIds);
  };
  const handleExperience = (e, value) => {
    const selectedIds = value.map((level) => level.id);
    setSelectedExperienceLevel(selectedIds);
  };
  React.useEffect(() => {
    console.log("instruments", selectedInstruments);
    console.log("genres", selectedGenres);
    console.log("exp_level", selectedExperienceLevel);
  }, [selectedInstruments, selectedGenres, selectedExperienceLevel]);

  return (
    <div className="border-4 rounded p-5 mb-4">
      <h2 className="text-lg text-center mb-4">Make a Jam Request</h2>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          sx={{ marginBottom: "1rem" }}
          multiple
          id="instrument-select"
          options={instruments}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          onChange={handleInstrument}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select instruments you play"
              placeholder="Instruments"
            />
          )}
        />
        <Autocomplete
          sx={{ marginBottom: "1rem" }}
          multiple
          id="genres-needed"
          options={genres}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.genre}
          defaultValue={[]}
          filterSelectedOptions
          onChange={handleGenre}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select genres you play"
              placeholder="Genres"
            />
          )}
        />
        <Autocomplete
          sx={{ marginBottom: "1rem" }}
          multiple
          id="experience-levels"
          options={experienceLevels}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.level}
          defaultValue={[]}
          filterSelectedOptions
          onChange={handleExperience}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select your experience level"
              placeholder="Experience Level"
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
          <Grid item xs={5}>
            <PickList label="State" name="state" list={allStates} />
          </Grid>
          <Button sx={{ margin: "1rem" }} type="submit" variant="contained">
            Submit Jam Request
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default JamRequestForm;
