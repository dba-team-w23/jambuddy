import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const ProfileSearchData = ({ profile }) => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [instruments, setInstruments] = React.useState([]);
  const [genres, setGenres] = React.useState([]);

  console.log("profile from psd: ", profile);
  console.log("profile id from psd: ", profile.id);

  const baseURL = "http://sea-turtle-app-zggz6.ondigitalocean.app/api/users/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const UserData = await fetch(`${baseURL}${profile.id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("user data: ", data);
            setInstruments(data.instrument_names);
            setGenres(data.genre_names);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p className="text-xs">
        <b>Instruments: </b>
        {instruments}
      </p>
      <p className="text-xs">
        <b>Genres: </b>
        {genres}
      </p>
    </div>
  );
};

export default ProfileSearchData;
