import React from "react";
import FavoriteJamRequests from "./FavoriteJamRequests";
import FavoriteUsers from "./FavoriteUsers";
import { useSelector } from "react-redux";

const HomePage = () => {
  const userData = useSelector((state) => state.user);

  const userId = userData.user.id;

  return (
    <div className="flex flex-wrap">
      <div className="bg-blue-50 rounded shadow p-4 flex flex-row flex-wrap">
        <h2 className="text-center w-full py-5">Saved Jam Requests</h2>
        <FavoriteJamRequests id={userId} />
      </div>
      <div className="bg-blue-50 rounded shadow p-4 flex flex-row flex-wrap">
        <h2 className="text-center w-full">Favorite Musicians</h2>
        {/* <FavoriteUsers id={userId} /> */}
      </div>
    </div>
  );
};

export default HomePage;
