import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleLikedJam } from "../../features/postSlice";

function FavoriteJamButton({ jamId }) {
  const userId = useSelector((state) => state.user.user.id);
  const likedJams = useSelector((state) => state.jam.likedJams);
  const dispatch = useDispatch();
  console.log("FJB jamId", jamId, "userId", userId, "likedJams", likedJams);

  const handleToggleLiked = () => {
    dispatch(toggleLikedJam({ jamId: jamId, userId: userId }));
  };

  return (
    <IconButton
      onClick={handleToggleLiked}
      aria-label="like"
      sx={{ float: "right" }}
    >
      {likedJams.includes(jamId) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

export default FavoriteJamButton;
