import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        onClick={handleOpen}
        className="rounded-full hover:bg-blue-50 w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
      >
        <MusicNoteIcon style={{ color: "#1976d2" }} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{profile.username}'s Jam Requests</h2>
        </Box>
      </Modal>
    </div>
  );
}
