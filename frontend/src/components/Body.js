import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from './Feed';
import Profile from './Profile';
import JamRequests from './JamRequests';
import NewJamRequest from './NewJamRequest';
import Profiles from './Profiles';
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
    const [user, setUser] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false);
    const tempUser = {id: 5, username: "dkeech", password: "123", lastlogin: "", fname: "Dan", lname: "Keech", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: "https://res.cloudinary.com/dg2srlhdk/image/upload/v1676075859/dan_k_cmwsxh.png"}

    const handleChange = () => {
      setSignedIn(!signedIn);
    };
    
    const userURL = `https://dbajamteam.pythonanywhere.com/api/users/${userId}`;

    // React.useEffect(() => {
    //     async function getUser() {
    //       const userData = await axios.get(userURL);
    //       setUser(userData.data);
    //       setIsLoading(false);
    //     }
    //     getUser();
    
    //   }, []);

      if (isLoading) return <div>Loading...</div>;

    return (
        <>
        <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
        <div className="signedIn">
        {signedIn ? <h2 onClick={handleChange}>Signed in as {userId}</h2> : <h2 onClick={handleChange}>Signed out</h2>}

        <Routes>
            <Route path="/" element={signedIn ? <JamRequests /> : <SignIn />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profiles" element= { signedIn ? <Profiles /> : "Sign in to see profiles"} />
            <Route path="jamrequests" element= { signedIn ? <JamRequests /> : "Sign in to see Jam Requests"} />
            <Route path="newjamrequest" element= { signedIn ? <NewJamRequest /> : "Sign in to see Jam Requests"} />
            <Route path="profile" element= { signedIn ? <Profile signedIn={signedIn} userId={userId} /> : "Sign in to create a profile"}/>
            <Route path="feed" element= { <Feed />} />
            <Route path="logout" onClick={handleChange} element={<SignIn />} />
            <Route path="*" element={<Error />} />
        </Routes>
        </div>
        </>
    )
}
