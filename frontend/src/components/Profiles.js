import React from "react";
import ProfileCard from './partials/ProfileCard'
import axios from "axios";
import { Grid } from '@mui/material';
import './css/Profiles.css'

const baseURL = "https://dbajamteam.pythonanywhere.com/api/users/";

export default function Profiles(){
    const [profiles, setProfiles] = React.useState(tempProfiles);

    // const getData = async () => {
    //     const {data} = await axios.get(baseURL);
    //     setProfiles(data);
    // }

    // React.useEffect(() => {
    //     getData();
    //     }, []);

    return(
    <Grid container spacing={2}>
        {profiles.map((profile, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                <ProfileCard profile={profile} />
            </Grid>
        )
    )}
    </Grid>
    )

}

const tempProfiles = [
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
    {id: Math.random(), username: "username", password: "123", lastlogin: "", fname: "First", lname: "Last", city: "Raleigh", state: "NC", email: "ddkeech@gmail.com", photo: `https://source.unsplash.com/random/?face&${Math.random()}`},
]
