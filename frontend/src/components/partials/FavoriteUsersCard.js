import * as React from "react";
import { format } from "date-fns";
import ProfileCardMini from "./ProfileCardMini";
import { useSelector } from "react-redux";
import axios from "axios";

export default function FavoriteUsersCard({ post }) {
  
  const user = useSelector((state) => state.user);
  console.log("fave profile userid " , user.user.id)
  const formattedDate = format(new Date(post.created), "MM/dd/yyyy");
  console.log("post from favorite users", post);

  return (
   {profiles.map((profile) => {
      return (
        <ProfileCardMini key={profile.id} profile={profile} />
      )})}
  );


      }
