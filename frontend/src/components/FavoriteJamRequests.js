import React from "react";
import { useEffect } from "react";
import FavoriteJamsCard from "./partials/FavoriteJamsCard";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function FavoriteJamRequests(userId) {
  const dispatch = useDispatch();
  const baseURL =
    "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userfavejamreqs";

  const [jamRequests, setJamRequests] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/${userId.id}`);
        console.log("fave jam requests", response.data.jamrequests);
        setJamRequests(response.data.jamrequests);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const removeCard = (id) => {
    setJamRequests((prevJamRequests) =>
      prevJamRequests.filter((request) => request.id !== id)
    );
  };
  return (
    <Grid container spacing={6}>
      {jamRequests.map((request, i) => {
        return (
          <Grid key={i} item xs={12} md={6} xl={3}>
            <FavoriteJamsCard
              key={i + 1000}
              post={request}
              onRemoveFavorite={() => removeCard(request.id)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
