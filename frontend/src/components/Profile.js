import * as React from "react";
import Box from "@mui/material/Box";
import "./css/SignIn.css";

import FormGrid from "./partials/FormGrid";

export default function EditProfile() {

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: "0 auto", width: "50ch" } }}

      noValidate
      autoComplete="off"
    >
      <FormGrid       style={{ margin: "0 auto"}} />
    </Box>
  );
}
