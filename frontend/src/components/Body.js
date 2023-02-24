import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import JamRequests from "./JamRequests";
import NewJamRequest from "./NewJamRequest";
import Profiles from "./Profiles";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Error from "./partials/Error";
import Navbar from "./partials/Navbar";
import "./css/Global.css";

export default function Body() {
  const [signedInUser, setSignedInUser] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  console.log("in body: ", signedInUser);
  const handleLogout = () => {
    setSignedInUser(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar signedInUser={signedInUser} setSignedInUser={setSignedInUser} />
      <div className="signedInUser">
        <Routes>
          <Route
            path="/"
            element={
              signedInUser ? (
                <div>
                  <h2>{signedInUser.username}</h2>
                  <h3>
                    {signedInUser.fname} {signedInUser.lname}
                  </h3>
                </div>
              ) : (
                <SignIn
                  signedInUser={signedInUser}
                  setSignedInUser={setSignedInUser}
                />
              )
            }
          />
          <Route
            path="signin"
            element={
              <SignIn
                signedInUser={signedInUser}
                setSignedInUser={setSignedInUser}
              />
            }
          />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="profiles"
            element={
              signedInUser ? (
                <Profiles />
              ) : (
                <SignIn
                  signedInUser={signedInUser}
                  setSignedInUser={setSignedInUser}
                />
              )
            }
          />
          <Route
            path="jamrequests"
            element={
              signedInUser ? (
                <JamRequests />
              ) : (
                <SignIn
                  signedInUser={signedInUser}
                  setSignedInUser={setSignedInUser}
                />
              )
            }
          />
          <Route
            path="newjamrequest"
            element={
              signedInUser ? (
                <NewJamRequest />
              ) : (
                <SignIn
                  signedInUser={signedInUser}
                  setSignedInUser={setSignedInUser}
                />
              )
            }
          />
          <Route
            path="profile"
            element={
              signedInUser ? (
                <Profile signedInUser={signedInUser} userId={userId} />
              ) : (
                <SignIn
                  signedInUser={signedInUser}
                  setSignedInUser={setSignedInUser}
                />
              )
            }
          />
          <Route
            path="logout"
            onClick={handleLogout}
            element={
              <SignIn
                signedInUser={signedInUser}
                setSignedInUser={setSignedInUser}
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}
