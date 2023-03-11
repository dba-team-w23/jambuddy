import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";

function FavoriteJamButton(isLiked) {
  const userId = useSelector((state) => state.user.user.id);

  console.log("FJB userId", userId, "isLiked", isLiked.isLiked);

  return (
    <IconButton aria-label="like" sx={{ float: "right" }}>
      {isLiked.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

export default FavoriteJamButton;
