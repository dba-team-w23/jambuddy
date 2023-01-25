import React from "react";  
import axios from "axios";

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
