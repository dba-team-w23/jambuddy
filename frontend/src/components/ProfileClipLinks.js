import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import ProfileCard from "./partials/ProfileCard";
import FormGrid from "./partials/FormGrid";
import { useSelector } from "react-redux";
import NewJamRequest from "./NewJamRequest";
import axios from "axios";
import { useEffect } from "react";

export function ProfileClipLinks({ profileId }) {
  const [links, setLinks] = useState([]);

  // Function to handle adding a new clip to the links state.
  function handleAddClip(url) {
    const newLink = { profile_id: profileId, clip_to_link: url };

    fetch("/api/clip", {
      method: "POST",
      body: JSON.stringify(newLink),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(data => {
      setLinks(prevLinks => [...prevLinks, data]);
    });
  }

  // Function to handle removing a clip from the links state.
  function handleRemoveClip(id) {
    fetch(`/api/clip/${id}`, { method: "DELETE" })
    .then(() => {
      setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
    });
  }

  // Fetch current list of clips from server on mount.
  useEffect(() => {
    fetch(`/api/userclips/${profileId}`)
    .then(response => response.json())
    .then(data => {
      setLinks(data);
    });
  }, [profileId]);

  return (
    <div>
      <h2>User Clips</h2>

      {/* Form for adding new clip */}
      <form onSubmit={e => {
        e.preventDefault();
        handleAddClip(e.target.url.value);
        e.target.reset();
      }}>
        <label htmlFor="url">Add New Clip:</label>
        <input type="text" id="url" name="url" />
        <button type="submit">Add</button>
      </form>

      {/* List of current clips with remove buttons */}
      <ul>
        {links.length === 0 ? <li>No clips found.</li> :
          links.map(link => (
            <li key={link.id}>
              <a href={link.clip_to_link} target="_blank" rel="noopener noreferrer">
                {link.clip_to_link}
              </a>
              <button onClick={() => handleRemoveClip(link.id)}>Remove</button>
            </li>
          ))}
      </ul>
    </div>
  );
}