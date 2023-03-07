import React from "react";
import Body from "./components/Body";
import { useSelector } from "react-redux";

import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    document.body.style.background = "#D0EDFF";
  }, [user]);
  return (
    <div style={{background: '3F5fde' }}>
      <Body  />
    </div>
  );
}

export default App;
