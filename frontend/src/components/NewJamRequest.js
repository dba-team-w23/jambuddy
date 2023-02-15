import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/";

const JamRequestForm = () => {
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
        const [instrumentsResponse, genresResponse, experienceLevelsResponse] = await Promise.all([
          axios.get(BASE_URL + "instruments/"),
          axios.get(BASE_URL + "musicgenres/"),
          axios.get(BASE_URL + "experiencelevels/"),
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
      await axios.post(BASE_URL + "jamrequests/", {
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Instruments:
        <select multiple value={selectedInstruments} onChange={(event) => setSelectedInstruments(Array.from(event.target.selectedOptions, (option) => option.value))}>
          {instruments.map((instrument) => (
            <option key={instrument.id} value={instrument.id}>
              {instrument.name}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Genres:
        <select multiple value={selectedGenres} onChange={(event) => setSelectedGenres(Array.from(event.target.selectedOptions, (option) => option.value))}>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genre}
            </option>
          ))}
        </select>
      </label>

      <br />
      <label>
        Location:
        <input type="text" onChange={(event) => setLocation(event.target.value)} />
      </label>
      <br />
      <br />
      <label>
        Experience Level:
        <select onChange={(event) => setExperienceLevel(event.target.value)}>
          {experienceLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.level}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default JamRequestForm;
