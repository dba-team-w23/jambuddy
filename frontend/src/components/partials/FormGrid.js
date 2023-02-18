import React from "react";
import Button from "@mui/material/Button";
import Password from "./Password";
import PickList from "./PickList";
import PickInstruments from "./PickInstruments";
import Multiline from "./Multiline";
import UploadWidget from "./UploadWidget";
import { Grid, TextField } from "@mui/material";
import {allStates} from './variables'
import { FormControl } from '@mui/material'
import Box from '@mui/material/Box'

export default function FormGrid() {
  const [instruments, setInstruments] = React.useState([]);
  const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  const instrumentApi = `${baseURL}/api/instruments/`;
  const [formValues, setFormValues] = React.useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    city: "",
    state: "",
    instrument: "",
    bio: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target
    console.log("handling form submission")
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))

    fetch(`${baseURL}/api/users/`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      mode: 'no-cors',
    })
      .then((response) => {
        if(!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((response) => console.log("success", JSON.stringify(response)))
      .catch((error) => {
        console.error("Error:", error)
        console.log("response obj: ", error.response)
      });
  }

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
            name="fname"
            label="First Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic-2"
            name="lname"
            label="Last Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic-3" label="Email" variant="outlined" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic-4"
            name="username"
            label="User Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField id="outlined-basic-5" name="city" label="City" variant="outlined" />
        </Grid>
        <Grid item xs={4}>
          <PickList label="State" name="state" list={allStates} />
        </Grid>
        <Grid item xs={12}>
          <PickInstruments label="Primary Instrument" name="instrument" list={instruments} />
        </Grid>
        <Grid item xs={12}>
          <Multiline
            className="bio"
            name="bio"
            default="Enter your bio here"
            label="bio"
            id="bio"
          />
        </Grid>
        <Grid item xs={12}>
          <Multiline
            className="longBio"
            name="longBio"
            default="Enter a detailed biography here"
            label="Full Bio"
            id="longBio"
          />
        </Grid>

        <Grid item xs={6}>
          <Password label="Password" name="password" id="pw1" />
        </Grid>
        <Grid item xs={6}>
          <Password label="Repeat Password" id="pw2" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">Save Profile</Button>
        </Grid>
      </Grid>
      <UploadWidget />
      </form>
   );
}

