import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../css/Global.css";
import Modal from "./Modal";
import { Card, CardContent, IconButton } from "@mui/material";
import JamsModal from "./JamsModal";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ProfileCardMini({ profile, onRemoveProfile }) {
  const user = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = React.useState(true);
  console.log("profile card mini", profile, isLiked);
  const removeFavorite = async () => {
    const baseURL =
      "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfaveprofiles";
    await axios.delete(`${baseURL}`, {
      data: { profileid: user.user.id, favorite_profileid: profile.id },
    });
    onRemoveProfile(() => {
      setIsLiked(!isLiked);
    });
  };
  React.useEffect(() => {
    console.log("isLiked FJC", isLiked);
  }, [isLiked]);

  return (
    <div className="m-5 ">
      <Card sx={{ position: "relative" }}>
        <div className="aspect-[4/3]">
          <img
            src={profile.photo}
            alt={`${profile.first_name} ${profile.last_name}`}
            className="object-cover w-full h-full position-absolute object-top"
          />
        </div>
        <CardContent>
          <h2 className="font-medium">{`${profile.first_name} ${profile.last_name}`}</h2>
          <h3>{profile.username}</h3>
          <h3>
            {profile.city && profile.state
              ? `${profile.city}, ${profile.state}`
              : `${profile.city} ${profile.state}`}
          </h3>

          <Typography variant="body2" color="text.secondary">
            {profile.genre}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={removeFavorite}
            aria-label="like"
            sx={{ float: "right" }}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <JamsModal {...profile} />
        </CardActions>

        <Modal {...profile} />
      </Card>
    </div>
  );
}
