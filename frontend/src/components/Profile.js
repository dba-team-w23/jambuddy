import * as React from "react";
import Box from "@mui/material/Box";
import "./css/SignIn.css";
import ProfileCard from "./partials/ProfileCard";
import FormGrid from "./partials/FormGrid";

export default function EditProfile(props) {
  const [signedInUser, setSignedInUser] = React.useState({ props });

  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const baseURL = `http://localhost:8000/api/users/${signedInUser.userId}/`;

  React.useEffect(() => {
    async function getData() {
      const userData = await fetch(baseURL).then((res) => res.json());
      setUser(userData);
      setIsLoading(false);
    }
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {user ? (
        <Box
          sx={{ "& > :not(style)": { m: "40px auto", width: "50ch" } }}
          noValidate
          autoComplete="off"
        >
          <MiniProfileCard profile={user} />
          <FormGrid style={{ margin: "40px auto" }} />
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
