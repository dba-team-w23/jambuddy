import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



function Navigation(){
    return(
        <>
            <ul>
                <li><Link to='/' className="btn">Home</Link></li>
                <li><Link to='/posts' className="btn">Posts</Link></li>
                <li><Link to='/profiles' className="btn">Profiles</Link></li>
                <li><Link to='/profile' className="btn">Profile</Link></li>
                <li><Link to='/signin' className="btn">Sign In</Link></li>
                <li><Link to='/search' className="btn">Search</Link></li>
                <li><Link to='/signup' className="btn">Sign Up</Link></li>
            </ul>


        </>
    )
}
export default Navigation;