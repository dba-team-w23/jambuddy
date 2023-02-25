import React, { useState } from "react";
import axios from "axios";

const ApiTest = () => {
  const doApi = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  const localApi = "http://localhost:8000";
  const localStorageApi = "http://localhost:8088";
  const getUsers = `${doApi}/api/users`;
  const localUsers = `${localApi}/api/users`;

  const doCreateUser = `${doApi}/api/users`;
  const lhCreateUser = `${localApi}/api/users`;
  const [corsMode, setCorsMode] = useState('mode: "cors"');

  const [doProfiles, setDoProfiles] = React.useState([]);
  const [lhProfiles, setLhProfiles] = React.useState([]);
  const [DOCreateUserResp, setDoCreateUserResp] = React.useState([]);
  const [LhCreateUserResp, setLhCreateUserResp] = React.useState([]);

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

  const doApiHandlePostCreateUser = async () => {
    const data = await fetch(doCreateUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: "hal",
        last_name: "9000",
        email: "hal@robot.com",
        username: "hal9000",
        password: "mystery",
      }),
      mode: corsMode,
    }).then((response) => response.json());
    console.log(data);
    setDoCreateUserResp(data);
  };

  const lhApiHandlePostCreateUser = async () => {
    const data = await fetch(lhCreateUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: "hal",
        last_name: "9000",
        email: "hal@robot.com",
        username: "hal9000",
        password: "mystery",
      }),
      mode: corsMode,
    }).then((response) => response.json());
    console.log(data);
    setDoCreateUserResp(data);
  };
  const clearLocalCreateUserResult = () => {
    setLhCreateUserResp([]);
  };
  const clearDOCreateUserResult = () => {
    setDoCreateUserResp([]);
  };

  const toggleCorsMode = () => {
    if (corsMode === "cors") {
      setCorsMode("no-cors");
    } else {
      setCorsMode("cors");
    }
  };
  return (
    <span>
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

      <div className="flex">
        <div className="p-4 m-5 border">
          <h2>Digital Ocean POST /users</h2>
          <button
            className="text-white bg-blue-500 p-2 rounded m-1"
            onClick={doApiHandlePostCreateUser}
          >
            DO POST /users
          </button>
          <button
            onClick={clearDOCreateUserResult}
            className="text-white bg-blue-500 p-2 rounded m-1"
          >
            clear
          </button>
          <button
            onClick={toggleCorsMode}
            className="text-white bg-blue-500 p-2 rounded m-1"
          >
            Toggle {corsMode}
          </button>
          <ul>
            {DOCreateUserResp && DOCreateUserResp.length !== 0 ? (
              <>
                <h4>status = {DOCreateUserResp.status}</h4>
                <h4>profile_id = {DOCreateUserResp.profile_id}</h4>
              </>
            ) : null}
          </ul>
        </div>

        <div className="p-4 m-5 border">
          <h2>Localhost POST /users</h2>
          <button
            className="text-white bg-blue-500 p-2 rounded m-1"
            onClick={lhApiHandlePostCreateUser}
          >
            {" "}
            LocalHost POST /users
          </button>
          <button
            onClick={clearLocalCreateUserResult}
            className="text-white bg-blue-500 p-2 rounded m-1"
          >
            clear
          </button>
          <ul>
            {LhCreateUserResp && LhCreateUserResp.length !== 0 ? (
              <>
                <h4>status = {LhCreateUserResp.status}</h4>
                <h4>profile_id = {LhCreateUserResp.profile_id}</h4>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </span>
  );
};

export default ApiTest;
