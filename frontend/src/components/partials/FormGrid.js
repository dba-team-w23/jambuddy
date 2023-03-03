import React from "react";
import Button from "@mui/material/Button";
import Password from "./Password";
import PickList from "./PickList";
import PickInstruments from "./PickInstruments";
import Multiline from "./Multiline";
import UploadWidget from "./UploadWidget";
import { Grid, TextField } from "@mui/material";
import { allStates } from "./variables";

import { useSelector } from "react-redux";

export default function FormGrid() {
  const userData = useSelector((state) => state.user);
  const [instruments, setInstruments] = React.useState([]);
  const [instrument, setInstrument] = React.useState({});
  const [imageURL, setImageURL] = React.useState("");
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      first_name: userData.user.first_name ? userData.user.first_name : "",
      last_name: userData.user.last_name ? userData.user.last_name : "",
      email: userData.user.email ? userData.user.email : "",
      username: userData.user.username ? userData.user.username : "",
      city: userData.user.city ? userData.user.city : "",
      state: userData.user.state ? userData.user.state : "",
      bio: userData.user.bio ? userData.user.bio : "",
      notes: userData.user.notes ? userData.user.notes : "",
      password: "",
      photo: imageURL ? imageURL : userData.user.photo,
    }
  );
  const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  const instrumentApi = `${baseURL}/api/instruments`;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());
    data.photo = imageURL ? imageURL : userData.user.photo;
    console.log(JSON.stringify(data));

    fetch(`${baseURL}/api/users/${userData.user.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => console.log("success", JSON.stringify(response)))
      .catch((error) => {
        console.error("Error:", error);
        console.log("response obj: ", error.response);
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setFormInput({ ...formInput, [name]: newValue });
    const updatedFormInput = { ...formInput, [name]: newValue };
    const inputElement = document.getElementsByName(name)[0];
  };
  const handleInstrument = (e) => {
    console.log("setInstrument");
    setInstrument(e.target.value);
  };
  const sortObject = (arr) => {
    arr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  };
  React.useEffect(() => {
    async function getData() {
      const instruments = await fetch(instrumentApi).then((res) => res.json());
      sortObject(instruments);
      setInstruments(instruments);
    }
    getData();
  }, []);

  return (
    <div className="border-4 rounded p-5 mb-4">
      <h2 className="text-lg text-center mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-1"
              name="first_name"
              label="First Name"
              variant="outlined"
              value={formInput.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-2"
              name="last_name"
              label="Last Name"
              variant="outlined"
              shrink="true"
              value={formInput.last_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-3"
              name="email"
              label="Email"
              variant="outlined"
              value={formInput.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic-4"
              name="username"
              label="User Name"
              variant="outlined"
              value={formInput.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic-5"
              name="city"
              label="City"
              variant="outlined"
              value={formInput.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <PickList label="State" name="state" list={allStates} />
          </Grid>
          <Grid item xs={12}>
            <PickInstruments
              label="Add an Instrument"
              name="instruments"
              value={instrument}
              list={instruments}
              onChange={handleInstrument}
            />
          </Grid>
          <Grid item xs={12}>
            <Multiline
              className="bio"
              name="note"
              default="Enter your bio here"
              label="Bio"
              id="bio"
              value={formInput.note ? formInput.note : ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Password label="Password" name="password" id="pw1" />
          </Grid>
          <Grid item xs={6}>
            <Password label="Repeat Password" id="pw2" />
          </Grid>
          <Grid item xs={8}>
            <UploadWidget value={imageURL} setImageURL={setImageURL} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
