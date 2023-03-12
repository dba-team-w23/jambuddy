import React, { useState } from "react";
import Button from "@mui/material/Button";
import Multiline from "./Multiline";
import UploadWidget from "./UploadWidget";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSlice } from "../../features/userSlice";

export default function FormGrid() {
  const userData = useSelector((state) => {
    console.log("FG userData: ", state.user);
    return state.user;
  });

  const [instruments, setInstruments] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [imageURL, setImageURL] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState(false);
  const label = { inputProps: { "aria-label": "Exclude from search results" } };
  const [hidden, setHidden] = React.useState(false);
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      first_name: userData.user.first_name || "",
      last_name: userData.user.last_name || "",
      email: userData.user.email || "",
      username: userData.user.username || "",
      city: userData.user.city || "",
      state: userData.user.state || "",
      note: userData.user.note || "",
      photo: userData.user.photo || "",
      hidden: userData.user.hidden || false,
    }
  );

  React.useEffect(() => {
    setFormInput({
      first_name: userData.user.first_name || "",
      last_name: userData.user.last_name || "",
      email: userData.user.email || "",
      username: userData.user.username || "",
      city: userData.user.city || "",
      state: userData.user.state || "",
      note: userData.user.note || "",
      photo: userData.user.photo || "",
      hidden: userData.user.hidden || false,
    });
  }, [userData.user]);

  const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/";
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [instrumentsResponse, genresResponse] = await Promise.all([
          axios.get(baseURL + "instruments"),
          axios.get(baseURL + "musicgenres"),
        ]);
        setInstruments(instrumentsResponse.data);
        setGenres(genresResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());
    data.instruments = selectedInstruments;
    data.genres = selectedGenres;
    data.photo = imageURL ? imageURL : userData.user.photo;
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}users/${userData.user.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedUser = await response.json();
      console.log("user update success", JSON.stringify(updatedUser));
      dispatch(userSlice.actions.updateUserProfile(updatedUser));
      setIsLoading(false);
      setFormSuccess(true);
      console.log("userData after update: ", userData);
    } catch (error) {
      console.error("Error:", error);
      console.log("response obj: ", error.response);
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleInstrument = (e, value) => {
    const selectedIds = value.map((instrument) => instrument.id);
    setSelectedInstruments(selectedIds);
  };
  const handleGenre = (e, value) => {
    const selectedIds = value.map((genre) => genre.id);
    setSelectedGenres(selectedIds);
  };
  const handleHidden = (e) => {
    setHidden(e.target.checked);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="drop-shadow-lg rounded p-5  bg-white">
      <h2 className="text-lg text-center mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              type="checkbox"
              id="hidden"
              name="hidden"
              value={hidden}
              onChange={handleHidden}
            />
            <label className="mx-3" htmlFor="hidden">
              Exclude profile from search results
            </label>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-1"
              name="first_name"
              label="First Name"
              variant="outlined"
              defaultValue={formInput.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-2"
              name="last_name"
              label="Last Name"
              variant="outlined"
              defaultValue={formInput.last_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-3"
              name="email"
              label="Email"
              variant="outlined"
              defaultValue={formInput.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-4"
              name="username"
              label="User Name"
              variant="outlined"
              defaultValue={formInput.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic-5"
              name="city"
              label="City"
              required
              error={formInput.city === ""}
              variant="outlined"
              defaultValue={formInput.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="just-state"
              required
              error={formInput.state === ""}
              name="state"
              label="State"
              defaultValue={formInput.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="pl-4 pt-4">
            <Autocomplete
              multiple
              id="instrument-select"
              options={instruments}
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
          </Grid>
          <Grid item xs={12} className="pl-4 mb-0 pt-4">
            <Autocomplete
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
          </Grid>
          <Grid item xs={12}>
            <Multiline
              className="bio"
              name="note"
              default="Enter your bio here"
              label="Enter your bio here"
              id="bio"
              value={formInput.note ? formInput.note : ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <UploadWidget value={imageURL} setImageURL={setImageURL} />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained">
              Save Profile
            </Button>
          </Grid>
          <Grid item xs={6}>
            {formSuccess && "Profile updated!"}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
