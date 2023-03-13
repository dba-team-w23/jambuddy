import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import "../css/Global.css";
import Modal from "./Modal";
import Reviews from "./Reviews";
import ReviewModal from "./ReviewModal";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProfileSearchData from "./ProfileSearchData";
import { Grid } from "@mui/material";

import { Card, CardContent, CardHeader, IconButton } from "@mui/material";

export default function ProfileCardForSearch({ profile }) {
  const user = useSelector((state) => state.user);
  const userMatch = profile.username == user.user.username;
  const [isLiked, setIsLiked] = React.useState(false);
  const [instruments, setInstruments] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const handleFavorite = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const baseURL =
      "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfaveprofiles";
    await axios.post(`${baseURL}`, {
      profileid: user.user.id,
      favorite_profileid: profile.id,
    });
    console.log("added favorite", profile.id);
  };
  const removeFavorite = async () => {
    const baseURL =
      "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfaveprofiles";
    await axios.delete(`${baseURL}`, {
      data: { profileid: user.user.id, favorite_profileid: profile.id },
    });
  };
  console.log("profile from pcfs", profile);
  return (
    <div>
      <Card sx={{ position: "relative" }}>
        <CardHeader
          title={`${profile.first_name} ${profile.last_name}`}
          subheader={profile.username}
        />
        <div className="aspect-[4/3]">
          <img
            src={profile.photo ? profile.photo : "./sunset.jpg"}
            alt={profile.first_name}
            className="object-cover position-absolute object-top w-full h-full"
          />
        </div>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {profile.city}, {profile.state}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.genre}
          </Typography>
        </CardContent>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <CardActions disableSpacing>
              <IconButton
                onClick={handleFavorite}
                aria-label="like"
                sx={{ float: "right" }}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              {/* <JamsModal {...profile} /> */}
            </CardActions>
          </Grid>
          <Grid item xs={10}>
            <ProfileSearchData profile={profile} />
          </Grid>
        </Grid>

        <div className="flex place-content-between  ">
          <Modal {...profile} />
          <ReviewModal {...profile} />
          <Reviews {...profile} />
        </div>
      </Card>
    </div>
  );
}
