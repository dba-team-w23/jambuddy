import * as React from "react";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import '../css/Global.css'
import Modal from './Modal'
import { Card,CardContent, CardHeader, IconButton } from "@mui/material";

export default function ProfileCard({ profile }) {
  //temp photo
  const [photoURL, setPhotoURL] = React.useState(
    profile.photo || `https://source.unsplash.com/random/?face&${Math.random()}`
  );

  React.useEffect(() => {
    if (!profile.photo) {
      console.log("no photo");
      return;
    }
    setPhotoURL(profile.photo);
  }, [profile]);

  return (
    <Card sx={{position: 'relative'}}>
      <CardHeader
        avatar={<Avatar aria-label="recipe"><img src={photoURL} width={40} height={40} /></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${profile.fname} ${profile.lname}`}
        subheader="content"
      />
      <CardMedia
        component="img"
        height="194"
        image={photoURL}
        alt={profile.fname}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {profile.username}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        </CardActions>
      <Modal {...profile} />
    </Card>
  );
}
