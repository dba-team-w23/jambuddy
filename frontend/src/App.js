import React from "react";
import Body from "./components/Body";
import Navbar from "./components/partials/Navbar";

function App(signedInUser) {
  return (
    <div>
      <Body signedInUser={signedInUser} />
    </div>
  );
}

export default App;
