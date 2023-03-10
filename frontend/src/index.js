import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import axios from "axios";
import { store } from "./features/store";
import { Provider } from "react-redux";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.mode = "no-cors";

const root = createRoot(document.getElementById("root"));
const lsUser = localStorage.getItem("user");
if (lsUser === "undefined") localStorage.removeItem("user");
const savedUser = lsUser ? JSON.parse(lsUser) : null;
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
