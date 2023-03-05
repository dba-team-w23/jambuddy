import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";
import ProfileModal from "./ProfileModal";

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
        <IconButton sx={{ float: "right" }} aria-label="add to favorites">
          <FavoriteIcon />
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
          <li>
            <Typography variant="body2">
              We need:
              <i>
                {post.instruments.length
                  ? ` ${mapInstrumentstoNames(
                      instruments,
                      post.instruments
                    ).join(", ")}`
                  : ""}
              </i>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Experience:{" "}
              <i>
                {mapExperiencetoNames(experienceLevels, post.exp_level).join(
                  ", "
                )}
              </i>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              {post.genres.length
                ? `We play: ${mapGenrestoNames(genres, post.genres).join(", ")}`
                : ""}
            </Typography>
          </li>
        </ul>
        <Typography variant="body1" margin="10px 0">
          Posted {formattedDate} by {post.requestor_profile.first_name}{" "}
          {post.requestor_profile.last_name}
          <ProfileModal {...post.requestor_profile} />
        </Typography>
      </CardContent>
    </Card>
  );
}
