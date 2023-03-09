import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const baseURL =
  "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userJamResponses";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function JamResponseModal({ ...jamRequest }) {
  const userData = useSelector((state) => state.user);
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userMatch = jamRequest.username == userData.user.username;
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      responderUserId: userData.user.id,
      jamRequestId: jamRequest.id,
      rating: 5,
    }
  );
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let data = { ...formInput, comment };
    console.log(JSON.stringify(data));
    const returnedUser = await fetch(baseURL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
    handleClose();
  };

  const handleJamResponseChange = (evt) => {
    setComment(evt.target.value);
  };

  return (
    <div>
      {userMatch ? null :
      <div
        onClick={handleOpen}
        className="rounded-full hover:bg-blue-50  flex items-center justify-center cursor-pointer"
      >
        <MusicNoteIcon style={{ color: "#1976d2" }} /> Let's jam!
      </div>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <TextField
              className="w-full"
              id="outlined-multiline-static"
              label={`Leave a note for ${jamRequest.requestor_profile.username}`}
              value={comment}
              onChange={handleJamResponseChange}
              multiline
              rows={8}
            />
            <Button sx={{ float: "right", marginTop: "10px" }} type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
