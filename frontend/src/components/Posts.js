import axios from "axios";
import React from "react";
import ControlledAccordions from "./Accordion";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function Posts(){   
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPosts(response.data);
        });
    }, []);


    return(
        <ControlledAccordions className="post-container" posts={posts} />
    )
}
