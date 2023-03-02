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
  const [imageURL, setImageURL] = React.useState("");
  const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  const instrumentApi = `${baseURL}/api/instruments`;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData.entries());

    fetch(`${baseURL}/api/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
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
    setValue(e.target.value);
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic-1"
            name="first_name"
            label="First Name"
            variant="outlined"
            value={userData.user.first_name ? userData.user.first_name : ""}
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
            value={userData.user.last_name ? userData.user.last_name : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic-3"
            label="Email"
            variant="outlined"
            value={userData.user.email ? userData.user.email : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic-4"
            name="username"
            label="User Name"
            variant="outlined"
            value={userData.user.username ? userData.user.username : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="outlined-basic-5"
            name="city"
            label="City"
            variant="outlined"
            value={userData.user.city ? userData.user.city : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <PickList label="State" name="state" list={allStates} />
        </Grid>
        <Grid item xs={12}>
          <PickInstruments
            label="Primary Instrument"
            name="instrument"
            list={instruments}
          />
        </Grid>
        <Grid item xs={12}>
          <Multiline
            className="bio"
            name="note"
            default="Enter your bio here"
            label="Bio"
            id="bio"
            value={userData.user.note ? userData.user.note : ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Password label="Password" name="password" id="pw1" />
        </Grid>
        <Grid item xs={6}>
          <Password label="Repeat Password" id="pw2" />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Save Profile
          </Button>
        </Grid>
      </Grid>
      <UploadWidget value={imageURL} setImageURL={setImageURL} />
    </form>
  );
}
