import React from "react";
import JamRequests from "./JamRequests";
import ProfileCardMini from "./partials/ProfileCardMini";
import { useSelector } from "react-redux";

const HomePage = () => {
  const userData = useSelector((state) => state.user);
  const [favProfiles, setFavProfiles] = React.useState([]);
  const [favJams, setFavJams] = React.useState([]);

  const userId = userData.user && userData.user.id;
  console.log("Homepage user id", userData.user && userId);
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
    <div className="flex flex-wrap">
      <div className="bg-blue-50 rounded shadow p-4 flex flex-row flex-wrap">
        <h2 className="text-center w-full">Favorite Musicians</h2>
        {favProfiles.map((profile, i) => (
          <ProfileCardMini key={i} profile={profile} />
        ))}
      </div>
      <div className="bg-blue-50 rounded shadow p-4 flex flex-row flex-wrap">
        <h2 className="text-center w-full py-5">Saved Jam Requests</h2>
        <JamRequests />
      </div>
    </div>
  );
};

export default HomePage;
