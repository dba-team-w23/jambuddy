import { useState } from "react";
import * as React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";

const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/";

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
  },
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
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setLinks((prevLinks) => [...prevLinks, data]);
      });
  }

  // Function to handle removing a clip from the links state.
  function handleRemoveClip(id) {
    fetch(`${baseURL}clips/${id}`, { method: "DELETE" }).then(() => {
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    });
  }

  // Fetch current list of clips from server on mount.
  useEffect(() => {
    fetch(`${baseURL}userclips/${userData.user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLinks(data);
      });
  }, [userData.user.id]);

  return (
    <div
      className="drop-shadow-lg rounded p-5"
      style={{ background: "#FFFFFF" }}
    >
      <h2 className="text-lg text-center mb-4">Highlighted Jam Clips</h2>
      {/* Form for adding new clip */}
      <p>
        Got a video of you jammin' that you'd like to share? Drop a URL below to
        show the world!
      </p>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddClip(e.target.url.value);
          e.target.reset();
        }}
      >
        <TextField
          sx={{ width: "100%", display: "block" }}
          variant="outlined"
          type="text"
          id="url"
          placeholder="<Clip of you jamming out!>"
          name="url"
        />
        <Button variant="contained" type="submit" style={{ margin: "1rem 0" }}>
          Add
        </Button>
      </form>

      {/* List of current clips with remove buttons */}
      <ul>
        {links.length === 0 ? (
          <li>No clips found.</li>
        ) : (
          links.map((link) => (
            <li key={link.id}>
              <StyledLink
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.link}
              </StyledLink>
              <Button
                variant="outlined"
                onClick={() => handleRemoveClip(link.id)}
                sx={{ display: "block", margin: "1rem 0" }}
              >
                Remove
              </Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
