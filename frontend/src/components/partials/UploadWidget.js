import React, { Component } from "react";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function CloudinaryUpload() {
  const [imageSelected, setImageSelected] = React.useState("");
  const [imageURL, setImageURL] = React.useState("")

  const uploadImage = async (files) => {
    const fd = new FormData();
    fd.append("file", imageSelected);
    fd.append("upload_preset", "zodoubq4");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dg2srlhdk/image/upload",
        {
          method: "post",
          body: fd,
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data);
      console.log(data.url)
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Grid item xs={9}>
        <Button variant="contained" component="label">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
            }}
          />
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={uploadImage}>
          Upload
        </Button>
      </Grid>
    </>
  );
}
