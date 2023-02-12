import React, { Component } from "react";
import Button from "@mui/material/Button";

export default function CloudinaryUploadWidget() {
  const showWidget = (e) => {
    e.preventDefault();
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dg2srlhdk",
        uploadPreset: "zodoubq4",
      },
      (error, result) => {
        if (!error) {
          console.log(result);
        }
      },
      
    );
    console.log(widget)
    widget.open();
  };

  return (
    
      <Button variant="contained" onClick={showWidget}>Upload Image</Button>
      
  );
}
