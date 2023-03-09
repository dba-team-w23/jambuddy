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
    data.location = location;
    data.instruments = selectedInstruments;
    data.genres = selectedGenres;
    data.exp_level = selectedExperienceLevel;
    console.log("data", data);

    try {
      await axios.post(BASE_URL + "jamrequests", {
        userid: userData.user.id,
        instrumentid: selectedInstruments,
        genreid: selectedGenres,
        location: location,
        exp_level: selectedExperienceLevel,
      });
      history.push("/jamrequests");
      // Show success message
    } catch (error) {
      console.error(error);
      // Show error message
    }
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
    <div
      className="border-4 rounded p-5 mb-4"
      style={{ background: "#FFFFFF" }}
    >
      <h2 className="text-lg text-center mb-4">Make a Jam Request</h2>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          sx={{ marginBottom: "1rem" }}
          multiple
          id="instrument-select"
          options={instruments}
          getoptionselected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          onChange={handleInstrument}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select instruments you need"
              placeholder="Instruments"
            />
          )}
        />
        <Autocomplete
          sx={{ marginBottom: "1rem" }}
          multiple
          id="genres-needed"
          options={genres}
          getoptionselected={(option, value) => option.id === value.id}
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
          getoptionselected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.level}
          defaultValue={[]}
          filterSelectedOptions
          onChange={handleExperience}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select experience level"
              placeholder="Experience Level(s)"
            />
          )}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-5"
              type="number"
              name="zip"
              label="Zip Code"
              variant="outlined"
              width="50%"
              onChange={(e) => setLocation(e.target.value)}
            />
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
