import React from "react";  
import axios from "axios";

const baseURL = "https://api.github.com/users";

export default function Profiles(){
    const [profiles, setProfiles] = React.useState([]);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setProfiles(response.data);
        });
    }, []);
    console.log(profiles.map((profile) => (
        <div>
            <h2>{profile.login}</h2>
            <p>{profile.avatar_url}</p>
        </div>
    )));

    return(
        <div>
        {profiles.map((profile) => (
            <>
            <h2>{profile.login}</h2>
            <img src={profile.avatar_url} />
            </>
        )
    )}
    </div>
    )   

}
