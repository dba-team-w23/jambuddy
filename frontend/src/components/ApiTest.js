import React, { useState } from "react";
import axios from "axios";

const ApiTest = () => {
  const doApi = "https://sea-turtle-app-zggz6.ondigitalocean.app";
  const localApi = "http://localhost:8000";
  const localStorageApi = "http://localhost:8088";
  const getUsers = `${doApi}/api/users`;
  const localUsers = `${localApi}/api/users`;

  const doLoginUser = `${doApi}/api/login_user`;
  const lhLoginUser = `${localApi}/api/login_user`;
  const [corsMode, setCorsMode] = useState('mode: "cors"');

  const [doProfiles, setDoProfiles] = React.useState([]);
  const [lhProfiles, setLhProfiles] = React.useState([]);
  const [DOLoginUserResp, setDoLoginUserResp] = React.useState([]);
  const [LhLoginUserResp, setLhLoginUserResp] = React.useState([]);

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

  const doApiHandlePostLoginUser = async () => {
    const data = await fetch(doLoginUser, {
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
      corsMode,
    }).then((response) => response.json());
    console.log(data);
    setDoLoginUserResp(data);
  };

  const lhApiHandlePostLoginUser = async () => {
    const data = await fetch(lhLoginUser, {
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
      corsMode,
    }).then((response) => response.json());
    console.log(data);
    setDoLoginUserResp(data);
  };
  const clearLocalLoginUserResult = () => {
    setLhLoginUserResp([]);
  };
  const clearDOLoginUserResult = () => {
    setDoLoginUserResp([]);
  };

  const toggleCorsMode = () => {
    if (corsMode === 'mode: "cors"') {
      setCorsMode('mode: "no-cors"');
    } else {
      setCorsMode('mode: "cors"');
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
          <h2>Digital Ocean POST /login_user</h2>
          <button
            className="text-white bg-blue-500 p-2 rounded m-1"
            onClick={doApiHandlePostLoginUser}
          >
            DO POST /login_user
          </button>
          <button
            onClick={clearDOLoginUserResult}
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
            {DOLoginUserResp && DOLoginUserResp.length !== 0 ? (
              <>
                <h4>status = {DOLoginUserResp.status}</h4>
                <h4>profile_id = {DOLoginUserResp.profile_id}</h4>
              </>
            ) : null}
          </ul>
        </div>

        <div className="p-4 m-5 border">
          <h2>Localhost POST /login_user</h2>
          <button
            className="text-white bg-blue-500 p-2 rounded m-1"
            onClick={lhApiHandlePostLoginUser}
          >
            {" "}
            LocalHost POST /login_user
          </button>
          <button
            onClick={clearLocalLoginUserResult}
            className="text-white bg-blue-500 p-2 rounded m-1"
          >
            clear
          </button>
          <ul>
            {LhLoginUserResp && LhLoginUserResp.length !== 0 ? (
              <>
                <h4>status = {LhLoginUserResp.status}</h4>
                <h4>profile_id = {LhLoginUserResp.profile_id}</h4>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </span>
  );
};

export default ApiTest;
