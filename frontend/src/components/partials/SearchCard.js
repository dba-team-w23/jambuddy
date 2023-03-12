import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import ProfileModal from "./ProfileModal";
import FavoriteJamButton from "./FavoriteUserButton";
import { useSelector } from "react-redux";
import axios from "axios";

export default function SearchCard({
  post,
  instruments,
  genres,
  experienceLevels,
}) {
  const user = useSelector((state) => state.user);
  const [instrumentsList, setInstrumentsList] = React.useState([]);
  const [genresList, setGenresList] = React.useState([]);
  const [experienceLevelsList, setExperienceLevelsList] = React.useState([]);
  const formattedDate = format(new Date(post.created), "MM/dd/yyyy");
  const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app/api";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [instrumentsResponse, genresResponse, experienceLevelsResponse] =
          await Promise.all([
            axios.get(apiRoot + "/instruments"),
            axios.get(apiRoot + "/musicgenres"),
            axios.get(apiRoot + "/experiencelevels"),
          ]);

        setInstrumentsList(instrumentsResponse.data);
        setGenresList(genresResponse.data);
        setExperienceLevelsList(experienceLevelsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log("experienceLevelsList[0]", experienceLevelsList[0]);
  }, []);

  const instrumentMap = {};
  instrumentsList.forEach((instrument) => {
    instrumentMap[instrument.id] = instrument.name;
  });
  const experienceMap = {};
  experienceLevelsList.forEach((experience) => {
    experienceMap[experience.id] = experience.level;
  });
  const genresMap = {};
  genresList.forEach((genre) => {
    genresMap[genre.id] = genre.genre;
  });

  return (
    <Card>
      <CardContent>
        <FavoriteJamButton userId={user.user.id} postId={post.id} />
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
              We need:&nbsp;
              <i>{instruments.map((id) => instrumentMap[id]).join(", ")}</i>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Experience:{" "}
              <i>
                {experienceLevels.map((id) => experienceMap[id]).join(", ")}
              </i>
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Genres:&nbsp;
              <i>{genres.map((id) => genresMap[id]).join(", ")}</i>
            </Typography>
          </li>
        </ul>
        <div className="my-5 testclass">
          Posted {formattedDate} by {post.requestor_profile.first_name}{" "}
          {post.requestor_profile.last_name}
          <ProfileModal {...post.requestor_profile} />
        </div>
      </CardContent>
    </Card>
  );
}
