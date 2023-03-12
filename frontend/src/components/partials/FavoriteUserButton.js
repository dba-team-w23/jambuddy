import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function LikeButton({ userId, profileId }) {
  const [isLiked, setIsLiked] = useState(false);
  const url = `https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfaveprofiles`;
  // console.log("profileid: ", userId, "favorite_profileid: ", profileId);
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
            favorite_profileid: profileId,
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
