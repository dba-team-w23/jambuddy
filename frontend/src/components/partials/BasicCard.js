import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";

export default function BasicCard({
  post,
  instruments,
  genres,
  experienceLevels,
  i,
}) {
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
      console.log("gtn genre", genre);
      return genre ? genre.genre : "";
    });
  };
  const mapExperiencetoNames = (experienceLevels, ids) => {
    console.log("gtn experienceLevels", experienceLevels);
    console.log("gtn ids", ids);
    return ids.map((id) => {
      const experience = experienceLevels.find(
        (experience) => experience.id === id
      );
      return experience ? experience.level : "";
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {post.requestor_profile.city} -- {post.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          contact name: {post.requestor_profile.first_name}
          {post.requestor_profile.last_name}
        </Typography>
        <Typography variant="body2">
          {post.instruments.length
            ? `We need: ${mapInstrumentstoNames(
                instruments,
                post.instruments
              ).join(", ")}`
            : ""}
          <br />
          experience:{" "}
          {mapExperiencetoNames(experienceLevels, post.exp_level).join(", ")}
          <br />
          {post.genres.length
            ? `We play: ${mapGenrestoNames(genres, post.genres).join(", ")}`
            : ""}
        </Typography>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <p>Posted {formattedDate}</p>
      </CardContent>
    </Card>
  );
}
