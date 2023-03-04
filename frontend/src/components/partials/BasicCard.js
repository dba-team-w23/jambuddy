import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({ post, author }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {post.location} -- {post.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* contact name: {author.first_name} {author.last_name} */}
        </Typography>
        <Typography variant="body2">
          {/* We need:{post.instrument} */}
          <br />
          {/* We play: {post.genre} */}
        </Typography>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
