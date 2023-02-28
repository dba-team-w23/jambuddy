import React from "react";
import Body from "./components/Body";
import Counter from "./features/Counter";
import User from "./features/User";
import { useSelector } from "react-redux";

function App() {
  return (
    <div>
      <Body />
      <User />
      {/* <Counter /> */}
    </div>
  );
}

export default App;
