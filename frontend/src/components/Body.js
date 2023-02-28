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
import { useSelector } from "react-redux";
// import { clearUserProfile } from "../features/userSlice";
import { userSlice } from "../features/userSlice";
import { useDispatch } from "react-redux";

export default function Body() {
  const userData = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("Handle logout");
    // dispatch(clearUserProfile());
    dispatch(userSlice.actions.clearUserProfile());
    localStorage.removeItem("user");

    console.log("signed in user", userData);
    console.log("local storage", localStorage);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] m-auto">
        <div className="w-48 py-4 m-auto border border-blue-500 my-4 shadow-blue-500/50 rounded-md">
          {<h1 className="text-4xl text-center">{userData.username}</h1>}
        </div>

        <div className="signedInUser">
          <Routes>
            <Route path="/" element={userData ? <HomePage /> : <SignIn />} />

            <Route path="signup" element={<SignUp />} />
            <Route path="profiles" element={true ? <Profiles /> : <SignIn />} />
            <Route
              path="jamrequests"
              element={true ? <JamRequests /> : <SignIn />}
            />
            <Route
              path="newjamrequest"
              element={userData ? <NewJamRequest /> : <SignIn />}
            />
            <Route
              path="profile"
              element={userData ? <Profile /> : <SignIn />}
            />
            <Route path="logout" onClick={handleLogout} element={<SignIn />} />
            <Route path="apitest" element={<ApiTest />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
