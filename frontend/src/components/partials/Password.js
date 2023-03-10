import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Password({ onPasswordChange }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handlePasswordChange = (evt) => {
    console.log("password", evt.target.value);
    if (typeof onPasswordChange === "function") {
      onPasswordChange(evt.target.value);
    }
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={`outlined-adornment-password`}>Password</InputLabel>
      <OutlinedInput
        id={`outlined-adornment-password`}
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        onChange={handlePasswordChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
