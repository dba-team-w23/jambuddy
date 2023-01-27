import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import {Image} from '@mui/icons-material';
import React from 'react';

export default function FileUpload() {
  const [image, setImage] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      setImage(event.target.files[0]);
      setError(null);
    } else {
      setError('Please select an image');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform upload logic here
    // e.g. using fetch or axios
    console.log('submitting image', image);
    //Resetting the form
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
        <Input
          id="image-upload"
          type="file"
          onChange={handleChange}
          endAdornment={<Image />}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
      <br/><br/>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!image}
      >
        Submit
      </Button>
    </form>
  );
}
