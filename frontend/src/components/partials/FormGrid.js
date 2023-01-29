import Button from "@mui/material/Button";

import Password from "./Password";
import PickList from "./PickList";
import Multiline from "./Multiline";
import FileUpload from "./FileUpload";
import { Grid, TextField } from '@mui/material';

export default function FormGrid() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField id="outlined-basic-1" label="First Name" variant="outlined" />
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
            <PickList 
              label="State"
              list={states}
              />
        </Grid>
        <Grid item xs={12}>
            <PickList 
              label="Primary Instrument"
              list={instruments}
              />
        </Grid>
        <Grid item xs={12}> 
            <Multiline 
              className="shortBio" 
              default="Enter a short bio here" 
              label="Short Bio"
              id="shortBio" />
        </Grid>
        <Grid item xs={12}>
            <Multiline 
              className="longBio" 
              default="Enter a detailed biography here" 
              label="Full Bio"
              id="longBio" />
        </Grid>

          <Grid item xs={6}>
              <Password id="pw1"/> 
          </Grid>
          

          <Grid item xs={6}>
              <Password label="Repeat Password" id="pw2"/>
          </Grid>
            <FileUpload />
        <Grid item xs={12}>
            <Button variant="contained" >Save Profile</Button>
        </Grid>
    </Grid>
  );
}

const instruments =[
  { id: 1, label: "Piano" },
  { id: 2, label: "Guitar" },
  { id: 3, label: "Drums" },
  { id: 4, label: "Bass" },
  { id: 5, label: "Violin" },
  { id: 6, label: "Trumpet" },
  { id: 7, label: "Saxophone" },
  { id: 8, label: "Cello" },
  { id: 9, label: "Flute" },
  { id: 10, label: "Clarinet" },
  { id: 11, label: "Trombone" },
  { id: 12, label: "Harp" },
  { id: 13, label: "Oboe" },
  { id: 14, label: "Bagpipes" },
  { id: 15, label: "Timpani" },
  { id: 16, label: "Banjo" },
  { id: 17, label: "Mandolin" },
  { id: 18, label: "Accordion" },
  { id: 19, label: "Steel drums" },
  { id: 20, label: "Xylophone" },
  { id: 21, label: "Harmonica" },
  { id: 22, label: "Didgeridoo" },
  { id: 23, label: "Electric Piano" },
  { id: 24, label: "Electric Bass" },
  { id: 25, label: "Electric Guitar" },
  { id: 26, label: "Keyboard" },
  { id: 27, label: "Drum Kit" },
  { id: 28, label: "Bongo" },
  { id: 29, label: "Conga" },
  { id: 30, label: "Tambourine" },
  { id: 31, label: "Castanets" },
  { id: 32, label: "Maracas" },
  { id: 33, label: "Triangle" },
  { id: 34, label: "Cymbals" },
  { id: 35, label: "Gong" },
  { id: 36, label: "Kazoo" },
  { id: 37, label: "Kalimba" },
  { id: 38, label: "Sitar" },
  { id: 39, label: "Dulcimer" },
  { id: 40, label: "Lute" },
  { id: 41, label: "Bouzouki" },
  { id: 42, label: "Sarod" },
  { id: 43, label: "Santoor" },
  { id: 44, label: "Shehnai" },
  { id: 46, label: "Tabla" },
  { id: 47, label: "Veena" },
  { id: 48, label: "Ukelele" },
  { id: 49, label: "Harmonium" },
  { id: 50, label: "Recorder" }
]
const states = [
    {id: "Alabama", label: "AL"},
    {id: "Alaska", label: "AK"},
    {id: "Arizona", label: "AZ"},
    {id: "Arkansas", label: "AR"},
    {id: "California", label: "CA"},
    {id: "Colorado", label: "CO"},
    {id: "Connecticut", label: "CT"},
    {id: "Delaware", label: "DE"},
    {id: "Florida", label: "FL"},
    {id: "Georgia", label: "GA"},
    {id: "Hawaii", label: "HI"},
    {id: "Idaho", label: "ID"},
    {id: "Illinois", label: "IL"},
    {id: "Indiana", label: "IN"},
    {id: "Iowa", label: "IA"},
    {id: "Kansas", label: "KS"},
    {id: "Kentucky", label: "KY"},
    {id: "Louisiana", label: "LA"},
    {id: "Maine", label: "ME"},
    {id: "Maryland", label: "MD"},
    {id: "Massachusetts", label: "MA"},
    {id: "Michigan", label: "MI"},
    {id: "Minnesota", label: "MN"},
    {id: "Mississippi", label: "MS"},
    {id: "Missouri", label: "MO"},
    {id: "Montana", label: "MT"},
    {id: "Nebraska", label: "NE"},
    {id: "Nevada", label: "NV"},
    {id: "New Hampshire", label: "NH"},
    {id: "New Jersey", label: "NJ"},
    {id: "New Mexico", label: "NM"},
    {id: "New York", label: "NY"},
    {id: "North Carolina", label: "NC"},
    {id: "North Dakota", label: "ND"},
    {id: "Ohio", label: "OH"},
    {id: "Oklahoma", label: "OK"},
    {id: "Oregon", label: "OR"},
    {id: "Pennsylvania", label: "PA"},
    {id: "Rhode Island", label: "RI"},
    {id: "South Carolina", label: "SC"},
    {id: "South Dakota", label: "SD"},
    {id: "Tennessee", label: "TN"},
    {id: "Texas", label: "TX"},
    {id: "Utah", label: "UT"},
    {id: "Vermont", label: "VT"},
    {id: "Virginia", label: "VA"},
    {id: "Washington", label: "WA"},
    {id: "West Virginia", label: "WV"},
    {id: "Wisconsin", label: "WI"},
    {id: "Wyoming", label: "WY"}
]


