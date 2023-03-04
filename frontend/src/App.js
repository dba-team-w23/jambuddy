import React from "react";
import Body from "./components/Body";
import User from "./features/User";
import { useSelector } from "react-redux";

// TODO DAN: commented this out because it was causing an error when I ran the app locally
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  const user = useSelector((state) => state.user);
  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Body />
        {/* {user.user && <User />} */}
      </div>
    // </LocalizationProvider>
  );
}

export default App;
