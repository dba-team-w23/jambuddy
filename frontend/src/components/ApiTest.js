import React, { useState } from "react";
import axios from "axios";

const ApiTest = () => {
  const doApi = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  const localApi = "http://localhost:8000";
  const localStorageApi = "http://localhost:8088";
  const getUsers = `${doApi}/api/users`;
  const localUsers = `${localApi}/api/users`;


  const [profiles, setProfiles] = React.useState([]);
  const [doProfiles, setDoProfiles] = React.useState([]);
  const [lhProfiles, setLhProfiles] = React.useState([]);

  const doApiHandle = async () => {
    const data = await fetch(getUsers).then((response) => response.json());
    console.log(data);
    setDoProfiles(data);
  };

  const lhApiHandle = async () => {
    const data = await fetch(localUsers).then((response) => response.json());
    console.log(data);
    setLhProfiles(data);
  };
  const clearLocalUsers = () => {
    setLhProfiles([]);
  };
  const clearDoUsers = () => {
    setDoProfiles([]);
  };

  return (
    <div className="flex">
      <div className="p-4 m-5 border">
        <h2>Digital Ocean GET users</h2>
        <button
          className="text-white bg-blue-500 p-2 rounded m-1"
          onClick={doApiHandle}
        >
          DO GET users
        </button>
        <button
          onClick={clearDoUsers}
          className="text-white bg-blue-500 p-2 rounded m-1"
        >
          clear
        </button>
        <ul>
          {doProfiles.map((profile, i) => (
            <li key={i}>
              <h4>{profile.username}</h4>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 m-5 border">
        <h2>Localhost GET users</h2>
        <button
          className="text-white bg-blue-500 p-2 rounded m-1"
          onClick={lhApiHandle}
        >
          {" "}
          LocalHost GET users
        </button>
        <button
          onClick={clearLocalUsers}
          className="text-white bg-blue-500 p-2 rounded m-1"
        >
          clear
        </button>
        <ul>
          {lhProfiles.map((profile, i) => (
            <li key={i}>
              <h4>{profile.username}</h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApiTest;
