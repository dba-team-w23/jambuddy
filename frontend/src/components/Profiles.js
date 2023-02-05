import React from "react";
import ProfileCard from './partials/Card'  
import axios from "axios";
import './css/Profiles.css'

const baseURL = "https://cors-anywhere.herokuapp.com/https://dbajamteam.pythonanywhere.com/api/users/";

export default function Profiles(){
    const [profiles, setProfiles] = React.useState([]);

    const getData = async () => {
        const {data} = await axios.get(baseURL);
        const profiles = (data)
        setProfiles(data);
    }

    React.useEffect(() => {
        getData();
        }, []);

    return(
        <div className="profiles">
        {profiles.map((profile, i) => (
            <ProfileCard key={i} profile={profile} />
        )
    )}
    </div>
    )   

}
