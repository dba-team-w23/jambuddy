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
import { userSlice } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../features/userSlice";
import { setSignedIn } from "../features/userSlice";

export default function Body() {
  const userData = useSelector((state) => state.user);
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const [isLoading, setIsLoading] = React.useState(false);
  const baseURL = `https://sea-turtle-app-zggz6.ondigitalocean.app/api/logout_user`;
  const dispatch = useDispatch();
  console.log("Body local storage:", localStorage);
  console.log("Body user data", userData);
  const user = localStorage.getItem("user");

  React.useEffect(() => {
    if (user) {
      dispatch(setUserProfile(JSON.parse(user)));
      dispatch(setSignedIn(true));
    }
    console.log("Body userData", userData);
  }, []);

  const handleLogout = async (userid) => {
    try {
      const response = await fetch(`${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid }),
      });
      const data = await response.json();
      localStorage.removeItem("user");
      dispatch(userSlice.actions.clearUserProfile());
      dispatch(userSlice.actions.setSignedIn(false));
      console.log("after logout local storage", localStorage);
      console.log("after logout user data", userData);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] m-auto">
        <div className="w-48 py-4 m-auto border border-blue-500 my-4 shadow-blue-500/50 rounded-md">
          {
            <>
              <h1 className="text-4xl text-center">
                {userData.user && userData.user.username}
              </h1>
              <h2 className="text-center">{isSignedIn && "is signed in"}</h2>
            </>
          }
        </div>

        <div className="signedInUser">
          <Routes>
            <Route path="/" element={isSignedIn ? <HomePage /> : <SignIn />} />

            <Route path="signup" element={<SignUp />} />
            <Route
              path="profiles"
              element={isSignedIn ? <Profiles /> : <SignIn />}
            />
            <Route
              path="jamrequests"
              element={isSignedIn ? <JamRequests /> : <SignIn />}
            />
            <Route
              path="newjamrequest"
              element={isSignedIn ? <NewJamRequest /> : <SignIn />}
            />
            <Route
              path="profile"
              element={isSignedIn ? <Profile /> : <SignIn />}
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
