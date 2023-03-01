import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReviewModal from "./ReviewModal";
import "../css/Global.css";
import Modal from "./Modal";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import JamsModal from "./JamsModal";

export default function ProfileCard({ profile }) {
  return (
    <div className="m-5 w-[200px]">
      <Card sx={{ position: "relative" }}>
        <div className="aspect-[4/3]">
          <img
            src={profile.photo}
            alt={`${profile.first_name} ${profile.last_name}`}
            className="object-cover w-full h-full position-absolute"
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <JamsModal {...profile} />
        </CardActions>

        <Modal {...profile} />
      </Card>
    </div>
  );
}
