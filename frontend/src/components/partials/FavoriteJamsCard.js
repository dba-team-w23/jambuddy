import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import ProfileModal from "./ProfileModal";
import FavoriteJamButton from "./FavoriteUserButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

export default function BasicCard({ post, onRemoveFavorite }) {
  const user = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = React.useState(true);
  const formattedDate = format(new Date(post.created), "MM/dd/yyyy");

  const removeFavorite = async () => {
    const baseURL =
      "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfavejamreqs";
    await axios.delete(`${baseURL}`, {
      data: { profileid: user.user.id, jrid: post.id },
    });
    onRemoveFavorite(() => {
      setIsLiked(!isLiked);
    });
  };
  React.useEffect(() => {
    console.log("isLiked FJC", isLiked);
  }, [isLiked]);
  return (
    <Card>
      <CardContent>
        <IconButton
          onClick={removeFavorite}
          aria-label="like"
          sx={{ float: "right" }}
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        <Typography variant="h5" color="text.secondary" gutterBottom>
          {post.requestor_profile.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.status}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          border="1px solid blue"
          padding="5px"
          margin="10px 0"
        >
          {post.note && post.note}
        </Typography>
        <ul className="list-disc list-outside ml-5">
          {post.instrument_names && (
            <li>
              <Typography variant="body2">
                We need:&nbsp;
                <i>{post.instrument_names}</i>
              </Typography>
            </li>
          )}

          {post.exp_level_names && (
            <li>
              <Typography variant="body2">
                Experience:&nbsp;<i>{post.exp_level_names}</i>
              </Typography>
            </li>
          )}
          {post.genre_names && (
            <li>
              <Typography variant="body2">
                Genres:&nbsp;{post.genre_names}
              </Typography>
            </li>
          )}
        </ul>
        <div className="my-5">
          Posted {formattedDate} by {post.requestor_profile.first_name}{" "}
          {post.requestor_profile.last_name}
          <ProfileModal {...post.requestor_profile} />
        </div>
      </CardContent>
    </Card>
  );
}
