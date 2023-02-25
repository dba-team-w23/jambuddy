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
import "../index.css";
import HomePage from "./HomePage";
import ApiTest from "./ApiTest";

export default function Body() {
  const [signedInUser, setSignedInUser] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const handleLogout = () => {
    setSignedInUser(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar signedInUser={signedInUser} setSignedInUser={setSignedInUser} />
      <div className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] m-auto">
        <div className="w-48 py-4 m-auto border border-blue-500 my-4 shadow-blue-500/50 rounded-md">
          {signedInUser && (
            <h1 className="text-4xl text-center">{signedInUser.username}</h1>
          )}
        </div>

        <div className="signedInUser">
          <Routes>
            <Route
              path="/"
              element={
                signedInUser ? (
                  <HomePage />
                ) : (
                  <SignIn
                    signedInUser={signedInUser}
                    setSignedInUser={setSignedInUser}
                  />
                )
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
                  <Profile signedInUser={signedInUser} />
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
            <Route path="apitest" element={<ApiTest />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
