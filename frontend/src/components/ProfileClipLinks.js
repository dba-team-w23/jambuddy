import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import ProfileCard from "./partials/ProfileCard";
import FormGrid from "./partials/FormGrid";
import NewJamRequest from "./NewJamRequest";
import axios from "axios";
import { useEffect } from "react";


const baseURL = 'https://sea-turtle-app-zggz6.ondigitalocean.app/api/';

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  "& ul": {
    listStyle: "none",
  },
  "& li": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  }
}));

const StyledLink = styled("a")({
  textDecoration: "none",
  color: "#3366ff",
});

export function ProfileClipLinks() {
    const userData = useSelector((state) => state.user);
  const [links, setLinks] = useState([]);

  // Function to handle adding a new clip to the links state.
  function handleAddClip(url) {
    const newLink = { profile_id: userData.user.id, clip_to_link: url };

    fetch(`${baseURL}clip`, {
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
    fetch(`${baseURL}clip/${id}`, { method: "DELETE" })
    .then(() => {
      setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
    });
  }

  // Fetch current list of clips from server on mount.
  useEffect(() => {
    fetch(`${baseURL}userclips/${userData.user.id}`)
    .then(response => response.json())
    .then(data => {
      setLinks(data);
    });
  }, [userData.user.id]);

  return (
    <StyledDiv>
      <Typography variant="h5" sx={{mb: 2}}>User Clips</Typography>

      {/* Form for adding new clip */}
      <form onSubmit={e => {
        e.preventDefault();
        handleAddClip(e.target.url.value);
        e.target.reset();
      }}>
        <label htmlFor="url">
          <Typography sx={{mr: 1}}>Add New Clip:</Typography>
        </label>
        <input type="text" id="url" name="url" />
        <Button variant="contained" type="submit">Add</Button>
      </form>

      {/* List of current clips with remove buttons */}
      <ul>
        {links.length === 0 ? <li>No clips found.</li> :
          links.map(link => (
            <li key={link.id}>
              <StyledLink href={link.clip_to_link} target="_blank" rel="noopener noreferrer">
                {link.clip_to_link}
              </StyledLink>
              <Button variant="outlined" onClick={() => handleRemoveClip(link.id)}>Remove</Button>
            </li>
          ))}
      </ul>
    </StyledDiv>
  );
}