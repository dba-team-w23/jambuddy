import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

function LikeButton({ userId, postId }) {
  const [isLiked, setIsLiked] = useState(false);
  const url = `https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfavejamreqs`;
  console.log("userId: ", userId, "postId: ", postId);
  const handleLike = () => {
    setIsLiked(!isLiked);
    const fetchData = async () => {
      try {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profileid: userId,
            jrid: postId,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      fetch(`${url}/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("from faves: ", data);
        });
    };
    fetchData();
  }, [isLiked]);

  return (
    <IconButton onClick={handleLike} aria-label="like" sx={{ float: "right" }}>
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

export default LikeButton;
