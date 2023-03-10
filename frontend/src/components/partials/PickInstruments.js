import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function PickList(props) {
  const { label, name, value, list, onChange } = props;

  return (
    <Autocomplete
      id={`${name}-select`}
      options={list}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          key={option.id}
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
}
