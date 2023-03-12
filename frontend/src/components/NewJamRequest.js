import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import Multiline from "./partials/Multiline";

const BASE_URL = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/";

const JamRequestForm = () => {
  const userData = useSelector((state) => state.user);
  const [instruments, setInstruments] = useState([]);
  const [genres, setGenres] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");
  const [jamInfo, setJamInfo] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

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
    data.profileid = userData.user.id;
    data.instruments = selectedInstruments;
    data.genres = selectedGenres;
    data.exp_level = selectedExperienceLevel;
    data.note = jamInfo;
    console.log(selectedInstruments);
    console.log("data", data);
    const sData = JSON.stringify(data);

    try {
      await axios.post(BASE_URL + "jamrequests", sData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setFormSuccess(true);
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
  const handleJamInfo = (e) => {
    console.log("hji", e.target.value);
    setJamInfo(e.target.value);
  };

  React.useEffect(() => {
    console.log("instruments", selectedInstruments);
    console.log("genres", selectedGenres);
    console.log("exp_level", selectedExperienceLevel);
  }, [selectedInstruments, selectedGenres, selectedExperienceLevel]);

  return (
    <div
      className="drop-shadow-lg rounded-md p-4 "
      style={{ background: "#FFFFFF" }}
    >
      <h2 className="text-lg text-center mb-4">Make a Jam Request</h2>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          sx={{ marginBottom: "1rem" }}
          multiple
          id="instrument-select"
          options={instruments}
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
        <Grid item xs={12} sx={{ marginBottom: "1rem" }}>
          {/* <Multiline
            sx={{ marginBottom: "1rem" }}
            className="jam-info"
            name="note"
            default="Jam Description"
            label="Jam Description"
          > */}
          <div>
            <TextField
              fullWidth
              id="jam-info"
              name="note"
              label="Jam Description"
              multiline
              maxRows={16}
              value={jamInfo}
              onChange={handleJamInfo}
            />
          </div>
          {/* </Multiline> */}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Button sx={{ margin: "1rem" }} type="submit" variant="contained">
              Submit Jam Request
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ marginTop: "1rem" }}>
            {formSuccess ? "Success!" : ""}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default JamRequestForm;
