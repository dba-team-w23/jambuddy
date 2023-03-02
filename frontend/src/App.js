import React from "react";
import Body from "./components/Body";
import User from "./features/User";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Body />
      {user.user && <User />}
    </div>
  );
}

export default App;
