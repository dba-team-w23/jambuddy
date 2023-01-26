import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Feed from './Feed';
import Profile from './Profile';
import Posts from './Posts';
import Profiles from './Profiles';
import Search from './Search';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Error from './Error';

function Body() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="search" element={<Search />} />
            <Route path="profiles"   element= { <Profiles />} />
            <Route path="posts"   element= { <Posts />} />
            <Route path="profile"   element= { <Profile />} />
            <Route path="feed"   element= { <Feed />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}
export default Body;