import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import axios from "axios";

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
  const [jams, setJams] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = profile.id;
  const baseURL = `https://sea-turtle-app-zggz6.ondigitalocean.app/api/jamrequestsforuser/${userId}`;

  const userJams = async () => {
    try {
      const response = await axios.get(`${baseURL}`);
      const data = await response.data;
      setJams(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    userJams();
  }, []);
  return (
    <div>
      {jams.length > 0 && (
        <div
          onClick={handleOpen}
          className="rounded-full hover:bg-blue-50 w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
        >
          <MusicNoteIcon style={{ color: "#1976d2" }} />
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{profile.username}'s Jam Requests</h2>
          <div>
            {jams}
            {jams.map((jam) => (
              <div className="border border-blue-500 my-5 p-5" key={jam.id}>
                <p>{jam.note}</p>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
