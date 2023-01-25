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
        // <div>
        //     {
        //         posts.map((post) => (
        //             <>
        //             <h2>{post.title}</h2>
        //             <p>{post.body}</p>
        //             </>
        //     ))}
        // </div>
        <ControlledAccordions posts={posts} />
    )
}
