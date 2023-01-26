import axios from "axios";
import React from "react";
import ControlledAccordions from "./Accordion";
import './Posts.css'

const baseURL = "https://dummyjson.com/posts";

export default function Posts(){   
    const [posts, setPosts] = React.useState([]);

    const getData = async () => {
        const {data} = await axios.get(baseURL);
        setPosts(data.posts);
    }
    
    React.useEffect(() => {
        getData();
        }, []);


    return(
        <ControlledAccordions className="post-container" posts={posts} />
        
    )
}




