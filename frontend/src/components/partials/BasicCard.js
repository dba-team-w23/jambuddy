import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import ProfileModal from "./ProfileModal";
import FavoriteJamButton from "./FavoriteJamButton";
import { useSelector } from "react-redux";
import JamResponseModal from "./JamResponseModal";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function BasicCard({
  post,
  instruments,
  genres,
  experienceLevels,
}) {
  const user = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = React.useState(false);

  const formattedDate = format(new Date(post.created), "MM/dd/yyyy");
  const mapInstrumentstoNames = (instruments, ids) => {
    return ids.map((id) => {
      const instrument = instruments.find((instrument) => instrument.id === id);
      return instrument ? instrument.name : "";
    });
  };
  const mapGenrestoNames = (genres, ids) => {
    return ids.map((id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.genre : "";
    });
  };
  const mapExperiencetoNames = (experienceLevels, ids) => {
    return ids.map((id) => {
      const experience = experienceLevels.find(
        (experience) => experience.id === id
      );
      return experience ? experience.level : "";
    });
  };
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
      "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfavejamreqs";
    await axios.post(`${baseURL}`, {
      profileid: user.user.id,
      jrid: post.id,
    });
  };
  const removeFavorite = async () => {
    const baseURL =
      "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfavejamreqs";
    await axios.delete(`${baseURL}`, {
      data: { profileid: user.user.id, jrid: post.id },
    });
  };

  React.useEffect(() => {
    console.log("isLiked", isLiked);
  }, [isLiked]);
  return (
    <Card>
      <CardContent>
        <div sx={{ float: "right" }} aria-label="add to favorites">
          <IconButton
            onClick={handleFavorite}
            aria-label="like"
            sx={{ float: "right" }}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {post.requestor_profile.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.status}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          border="1px solid '#1976D2'"
          padding="5px"
          margin="10px 0"
        >
          {post.note && post.note}
        </Typography>
        <ul className="list-disc list-outside ml-5">

          {post.instruments.length
                ?
          <li>
            <Typography variant="body2">
              <i>We need:</i> {mapInstrumentstoNames(instruments, post.instruments).join(", ")}
            </Typography>
          </li>
          : ''}


          {post.exp_level.length
                ?
          <li>
            <Typography variant="body2">
              <i>Experience:</i> {mapExperiencetoNames(experienceLevels, post.exp_level).join(", ")}
            </Typography>
          </li>
          : ''}

          {post.genres.length
                ?
          <li>
            <Typography variant="body2">
            <i>We play:</i> {mapGenrestoNames(genres, post.genres).join(", ")}
            </Typography>
          </li>
          : ''}

        </ul>
        <div className="m-4">
          Posted {formattedDate} by {post.requestor_profile.first_name}{" "}
          {post.requestor_profile.last_name}
          <ProfileModal {...post.requestor_profile} />
        </div>
      </CardContent>
      <div className="flex place-content-around mb-2  ">
        <JamResponseModal {...post} />
      </div>
    </Card>
  );
}
