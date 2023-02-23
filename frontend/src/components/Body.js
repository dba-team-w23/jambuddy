import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./Feed";
import Profile from "./Profile";
import JamRequests from "./JamRequests";
import NewJamRequest from "./NewJamRequest";
import Profiles from "./Profiles";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Error from "./partials/Error";
import Navbar from "./partials/Navbar";
import "./css/Global.css";

export default function Body(props) {
  // const [signedIn, setSignedIn] = React.useState(props.signedIn);
  const [signedIn, setSignedIn] = React.useState(true);
  // const [username, setUsername] = React.useState(props.userId)
  const [userId, setUserId] = React.useState(5);
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = () => {
    setSignedIn(!signedIn);
  };

  const userURL = `http://localhost:8088/api/users/${userId}/`;

  React.useEffect(() => {
    async function getUser() {
      const userData = await fetch(userURL).then((res) => res.json());
      setUser(userData);
      setIsLoading(false);
    }
    getUser();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
      <div className="signedIn">
        {signedIn ? (
          <h2 onClick={handleChange}>Signed in as {user.username}</h2>
        ) : (
          <h2 onClick={handleChange}>Signed out</h2>
        )}

        <Routes>
          <Route path="/" element={signedIn ? <JamRequests /> : <SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="profiles"
            element={signedIn ? <Profiles /> : <SignIn />}
          />
          <Route
            path="jamrequests"
            element={signedIn ? <JamRequests /> : <SignIn />}
          />
          <Route
            path="newjamrequest"
            element={signedIn ? <NewJamRequest /> : <SignIn />}
          />
          <Route
            path="profile"
            element={
              signedIn ? (
                <Profile signedIn={signedIn} userId={userId} />
              ) : (
                <SignIn />
              )
            }
          />
          <Route path="logout" onClick={handleChange} element={<SignIn />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}
