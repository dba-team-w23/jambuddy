import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Image, AudioFile} from "@mui/icons-material";
import {Grid} from "@mui/material";
import UploadWidget from "./UploadWidget";
export default function FileUpload({ iconType, ...props }) {
  const icon = iconType;
  return (
    <>
    <Grid item xs={6} >

    <Photo />
    </Grid>
    {/* <Grid  item xs={6} >
    <Music />
    </Grid> */}

    </>
  );
}

const Photo = () => {
  return (
    <>
      <Button id="upload_widget" className="cloudinary-button" variant="contained" component="label">
        Photo
       
        <IconButton style={{color: "white"}} aria-label="upload picture" component="label">
        
        <Image />
      </IconButton>
      </Button>

    </>
  );
};
// const Music = () => {
//   return (
//     <>
//       <Button variant="contained" component="label">
//         Audio
//         <input hidden accept="image/*" multiple type="file" />
//         <IconButton style={{color: "white"}} aria-label="upload audio" component="label">
//         <input hidden accept="audio/*" type="file" />
//         <AudioFile />
//       </IconButton>
//       </Button>

//     </>
//   );
// }