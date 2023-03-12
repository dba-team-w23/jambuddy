import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProfileData = ({ profile }) => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div>
      <p className="text-xs">
        <b>Instruments: </b>
        {profile.instrument_names}
      </p>
      <p className="text-xs">
        <b>Genres: </b>
        {profile.genre_names}
      </p>
    </div>
  );
};

export default ProfileData;
