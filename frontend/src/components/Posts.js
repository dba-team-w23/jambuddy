import axios from "axios";
import React from "react";
import ControlledAccordions from "./Accordion";
import './css/Posts.css'

const baseURL = "https://dbajamteam.pythonanywhere.com/api/jamrequests/";

export default function Posts(){
    const [posts, setPosts] = React.useState([]);

    const getData = async () => {
        const {data} = await axios.get(baseURL);
        setPosts(data);
    }

    React.useEffect(() => {
        getData();
        }, []);

    return(
        <ControlledAccordions className="post-container" posts={posts} />
    )
}




