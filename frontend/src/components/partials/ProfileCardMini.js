import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "../css/Global.css";
import Modal from "./Modal";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";

export default function ProfileCard({ profile }) {
  return (
    <div className="m-5 max-w-[200px]">
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
          <div className="rounded-full hover:bg-blue-50 w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
            <MusicNoteIcon style={{ color: "#1976d2" }} />
          </div>
        </CardActions>
        <Modal {...profile} />
      </Card>
    </div>
  );
}
