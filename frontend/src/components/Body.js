import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from './Feed';
import Profile from './Profile';
import Posts from './Posts';
import Profiles from './Profiles';
import Search from './Search';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Error from './partials/Error';
import Navbar from './partials/Navbar';
import './css/Global.css';

function Body() {
    const [signedIn, setSignedIn] = React.useState(true);

  const handleChange = () => {
    setSignedIn(!signedIn);

    
  };

    return (
        <>
        <Navbar signedIn={signedIn} setSignedIn={setSignedIn}/>
        <div className="signedIn">
        {signedIn ? <h2 onClick={handleChange}>Signed in</h2> : <h2 onClick={handleChange}>Signed out</h2>}
           
        <Routes>
            <Route path="/" element={signedIn ? <Posts /> : <SignIn />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="search" element={<Search />} />
            <Route path="profiles" element= { signedIn ? <Profiles /> : "Sign in to see profiles"} />
            <Route path="jamrequests" element= { signedIn ? <Posts /> : "Sign in to see Jam Requests"} />
            <Route path="profile" element= { signedIn ? <Profile /> : "Sign in to create a profile"}/>
            <Route path="feed" element= { <Feed />} />
            <Route path="logout" onClick={handleChange} element={<SignIn />} />
            <Route path="*" element={<Error />} />
        </Routes>
        </div>
        </>
    )
}
export default Body;