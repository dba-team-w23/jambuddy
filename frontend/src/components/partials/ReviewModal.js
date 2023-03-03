import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

const baseURL =
  "https://sea-turtle-app-zggz6.ondigitalocean.app/api/userreviews";
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

export default function BasicModal({ ...profile }) {
  const userData = useSelector((state) => state.user);
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userMatch = profile.username == userData.user.username;
  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      reviewerid: userData.user.id,
      profileid: profile.id,
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

  const handleReviewChange = (evt) => {
    setComment(evt.target.value);
  };

  return (
    <div>
      {userMatch ? null : <Button onClick={handleOpen}>Review Me</Button>}

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
              label={`Leave a review for ${profile.username}`}
              value={comment}
              onChange={handleReviewChange}
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
