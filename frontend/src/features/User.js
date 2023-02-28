import React from "react";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.user);
  console.log("user", user);

  const handleSignIn = () => {
    console.log("handleSignIn");
  };

  const handleSignOut = () => {
    console.log("handleSignOut");
  };

  return (
    <div className="p-4 border-blue-500">
      <h2>{user.username}</h2>
      <h2>
        {user.first_name} {user.last_name}
      </h2>
      <h2>{user.email}</h2>
      <h2>{user.id}</h2>
    </div>
  );
};

export default User;
