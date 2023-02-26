import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.mode = "no-cors";

const root = createRoot(document.getElementById("root"));
const savedUser = JSON.parse(localStorage.getItem("user"));
const initialUser = savedUser ? savedUser : null;
console.log("initial user:", initialUser);
window.React1 = require("react");

root.render(
  <React.StrictMode>
    <BrowserRouter {...window.__REACT_DEVTOOLS_GLOBAL_HOOK__}>
      <App signedInUser={initialUser} />
    </BrowserRouter>
  </React.StrictMode>
);
