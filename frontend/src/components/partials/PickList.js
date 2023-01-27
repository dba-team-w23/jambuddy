import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CountrySelect() {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={instruments}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
  
          {option.label} 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Primary instrument"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
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