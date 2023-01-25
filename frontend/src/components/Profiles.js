import React from "react";
import ProfileCard from './Card'  
import axios from "axios";
import './Profiles.css'

const baseURL = "https://api.github.com/users";

export default function Profiles(){
    const [profiles, setProfiles] = React.useState([]);

    const getData = async () => {
        const {data} = await axios.get(baseURL);
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
