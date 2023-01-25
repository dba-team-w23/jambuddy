import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Feed from './Feed';
import Header from './Header';
import Profile from './Profile';
import Footer from './Footer';
import Posts from './Posts';
import Profiles from './Profiles';
import Search from './Search';
import SignIn from './SignIn';
import Error from './Error';

function Body() {
    return (
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="signin" element={<SignIn />} />
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