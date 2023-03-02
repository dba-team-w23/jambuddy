import React from "react";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="p-4 border-blue-500 text-center">
      <h2>{user.user.username}</h2>
      <h2>
        {user.user.first_name} {user.user.last_name}
      </h2>
      <h2>{user.user.email}</h2>
      <h2>id: {user.user.id}</h2>
      <h2>{user.user.photo}</h2>
    </div>
  );
};

export default User;
