import React from "react";
import JamRequests from "./JamRequests";
import ProfileCard from "./partials/ProfileCard";

const HomePage = () => {
  const [favProfiles, setFavProfiles] = React.useState([]);
  const [favJams, setFavJams] = React.useState([]);

  const apiRoot = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  const baseURL = `${apiRoot}/api/users`;
  const jamURL = `${apiRoot}/api/jamrequests`;

  const getProfiles = async () => {
    const data = await fetch(baseURL).then((response) => response.json());
    setFavProfiles(data);
  };
  React.useEffect(() => {
    getProfiles();
  }, []);

  const getJams = async () => {
    const data = await fetch(jamURL).then((response) => response.json());
    setFavJams(data);
  };
  React.useEffect(() => {
    getJams();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-50 rounded shadow p-4 flex flex-row flex-wrap">
        <h2>Favorite Musicians</h2>
        {favProfiles.map((profile, i) => (
          <ProfileCard profile={profile} />
        ))}
      </div>
      <div className="bg-blue-50 rounded shadow p-4 flex flex-row flex-wrap">
        <h2>Saved Jam Requests</h2>
        <JamRequests />
      </div>
    </div>
  );
};

export default HomePage;
