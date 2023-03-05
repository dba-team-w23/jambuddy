import React from "react";
import Body from "./components/Body";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Body />
    </div>
  );
}

export default App;
