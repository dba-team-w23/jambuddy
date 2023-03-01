import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";
import { store } from "./features/store";
import { Provider } from "react-redux";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.mode = "no-cors";

const root = createRoot(document.getElementById("root"));
const savedUser = JSON.parse(localStorage.getItem("user"));
const initialUser = savedUser ? savedUser : null;

window.React1 = require("react");

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App signedInUser={initialUser} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
