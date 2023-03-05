import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ProfileCard from "./ProfileCard";
import { Box } from "@mui/system";
import { Avatar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 0,
};

export default function BasicModal({ ...profile }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <Avatar alt="" src={profile.photo} />
        <span className="mx-5">{profile.username}</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProfileCard className="w-full" profile={profile} />
        </Box>
      </Modal>
    </div>
  );
}
