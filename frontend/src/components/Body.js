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
import { Switch } from '@mui/material'

function Body() {
    const [signedIn, setSignedIn] = React.useState(false);

  const handleChange = (e) => {
    setSignedIn(e.target.checked);
  };

    return (
        <>
        <h2>Signed in?  <Switch checked={signedIn} onChange={handleChange} /></h2>
           
        <Routes>
            
            <Route path="/" element={signedIn ? <Posts /> : <SignIn />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="search" element={<Search />} />
            <Route path="profiles" element= { signedIn ? <Profiles /> : "Sign in to see profiles"} />
            <Route path="posts" element= { <Posts />} />
            <Route path="profile" element= { signedIn ? <Profile /> : "Sign in to create a profile"}/>
            <Route path="feed" element= { <Feed />} />
            <Route path="logout" element={<SignIn />} />
            <Route path="*" element={<Error />} />
        </Routes>

        </>
    )
}
export default Body;