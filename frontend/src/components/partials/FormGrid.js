import React from 'react'
import Button from "@mui/material/Button"
import Password from "./Password"
import PickList from "./PickList"
import PickInstruments from './PickInstruments'
import Multiline from "./Multiline"
import UploadWidget from "./UploadWidget"
import { Grid, TextField } from "@mui/material"

export default function FormGrid() {
  const [instruments, setInstruments] = React.useState([]);
  const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app"
  const instrumentApi = `${baseURL}/api/instruments/`

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
  }
  React.useEffect(() => {
    async function getData() {
      const instruments = await fetch(instrumentApi)
      .then(res => res.json())
      sortObject(instruments)
      setInstruments(instruments)
    }
    getData()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic-1"
          label="First Name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic-2" label="Last Name" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic-3" label="Email" variant="outlined" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic-4" label="User Name" variant="outlined" />
      </Grid>
      <Grid item xs={8}>
        <TextField id="outlined-basic-5" label="City" variant="outlined" />
      </Grid>
      <Grid item xs={4}>
        <PickList label="State" list={states} />
      </Grid>
      <Grid item xs={12}>
        <PickInstruments label="Primary Instrument" list={instruments} />
      </Grid>
      <Grid item xs={12}>
        <Multiline
          className="shortBio"
          default="Enter a short bio here"
          label="Short Bio"
          id="shortBio"
        />
      </Grid>
      <Grid item xs={12}>
        <Multiline
          className="longBio"
          default="Enter a detailed biography here"
          label="Full Bio"
          id="longBio"
        />
      </Grid>

      <Grid item xs={6}>
        <Password label="Password" id="pw1" />
      </Grid>
      <Grid item xs={6}>
        <Password label="Repeat Password" id="pw2" />
      </Grid>

        <UploadWidget />


      <Grid item xs={12}>
        <Button variant="contained">Save Profile</Button>
      </Grid>
    </Grid>
  );
  
}

const states = [
  { id: "Alabama", label: "AL" },
  { id: "Alaska", label: "AK" },
  { id: "Arizona", label: "AZ" },
  { id: "Arkansas", label: "AR" },
  { id: "California", label: "CA" },
  { id: "Colorado", label: "CO" },
  { id: "Connecticut", label: "CT" },
  { id: "Delaware", label: "DE" },
  { id: "Florida", label: "FL" },
  { id: "Georgia", label: "GA" },
  { id: "Hawaii", label: "HI" },
  { id: "Idaho", label: "ID" },
  { id: "Illinois", label: "IL" },
  { id: "Indiana", label: "IN" },
  { id: "Iowa", label: "IA" },
  { id: "Kansas", label: "KS" },
  { id: "Kentucky", label: "KY" },
  { id: "Louisiana", label: "LA" },
  { id: "Maine", label: "ME" },
  { id: "Maryland", label: "MD" },
  { id: "Massachusetts", label: "MA" },
  { id: "Michigan", label: "MI" },
  { id: "Minnesota", label: "MN" },
  { id: "Mississippi", label: "MS" },
  { id: "Missouri", label: "MO" },
  { id: "Montana", label: "MT" },
  { id: "Nebraska", label: "NE" },
  { id: "Nevada", label: "NV" },
  { id: "New Hampshire", label: "NH" },
  { id: "New Jersey", label: "NJ" },
  { id: "New Mexico", label: "NM" },
  { id: "New York", label: "NY" },
  { id: "North Carolina", label: "NC" },
  { id: "North Dakota", label: "ND" },
  { id: "Ohio", label: "OH" },
  { id: "Oklahoma", label: "OK" },
  { id: "Oregon", label: "OR" },
  { id: "Pennsylvania", label: "PA" },
  { id: "Rhode Island", label: "RI" },
  { id: "South Carolina", label: "SC" },
  { id: "South Dakota", label: "SD" },
  { id: "Tennessee", label: "TN" },
  { id: "Texas", label: "TX" },
  { id: "Utah", label: "UT" },
  { id: "Vermont", label: "VT" },
  { id: "Virginia", label: "VA" },
  { id: "Washington", label: "WA" },
  { id: "West Virginia", label: "WV" },
  { id: "Wisconsin", label: "WI" },
  { id: "Wyoming", label: "WY" },
];
