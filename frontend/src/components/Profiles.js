import React from "react";
import ProfileCard from './partials/ProfileCard'
import { Grid } from '@mui/material';
import './css/Profiles.css'

// const apiRoot = 'http://localhost:8000'
const apiRoot = 'https://sea-turtle-app-zggz6.ondigitalocean.app'
const baseURL = `${apiRoot}/api/users/`

export default function Profiles(){
    const [profiles, setProfiles] = React.useState([]);

    const getData = async () => {
        const [data] = await fetch(baseURL).then(response => response.json())
        setProfiles(data);
    }
    React.useEffect(() => {
        getData();
        }, []);
    React.useEffect(() => {
        console.log("profiles: ", profiles)
        console.log("profiles.length: ", profiles.length)
    })
    return(
        <div>
       {profiles.length > 0 ? (     
        <Grid container spacing={2}>
            {profiles.map((profile, i) => (
                <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                    <ProfileCard profile={profile} />
                </Grid>
            )
        )}
        </Grid>
       ) : (
              <div className="loading">Loading profiles...</div>
       )}
       </div>
    )
}
