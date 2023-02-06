import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from './Feed';
import Profile from './Profile';
import JamRequests from './JamRequests';
import Profiles from './Profiles';
import Search from './Search';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Error from './partials/Error';
import Navbar from './partials/Navbar';
import './css/Global.css';

export default function Body(props) {
    // const [signedIn, setSignedIn] = React.useState(props.signedIn);
    const [signedIn, setSignedIn] = React.useState(true);
    // const [username, setUsername] = React.useState(props.userId)
    const [userId, setUserId] = React.useState(5)
   
    const handleChange = () => {
      setSignedIn(!signedIn);
    };

    return (
        <>
        <Navbar signedIn={signedIn} setSignedIn={setSignedIn}/>
        <div className="signedIn">
        {signedIn ? <h2 onClick={handleChange}>Signed in as {userId}</h2> : <h2 onClick={handleChange}>Signed out</h2>}
           
        <Routes>
            <Route path="/" element={signedIn ? <JamRequests /> : <SignIn />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="search" element={<Search />} />
            <Route path="profiles" element= { signedIn ? <Profiles /> : "Sign in to see profiles"} />
            <Route path="jamrequests" element= { signedIn ? <JamRequests /> : "Sign in to see Jam Requests"} />
            <Route path="profile" element= { signedIn ? <Profile signedIn={signedIn} userId={userId} /> : "Sign in to create a profile"}/>
            <Route path="feed" element= { <Feed />} />
            <Route path="logout" onClick={handleChange} element={<SignIn />} />
            <Route path="*" element={<Error />} />
        </Routes>
        </div>
        </>
    )
}
