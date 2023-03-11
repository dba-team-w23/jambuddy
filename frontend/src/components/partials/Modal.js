import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  const [links, setLinks] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch user's clips on mount
  React.useEffect(() => {
    try {
      const baseURL = 'https://sea-turtle-app-zggz6.ondigitalocean.app/api/';
      const response = fetch(`${baseURL}userclips/${profile.id}`);
      if (!response.ok) {
        throw new Error("Network response is not ok");
      }
      const data = response.json();
      setLinks(data);
    } catch(error) {
      console.error('There was an error', error);
    }
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>About</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {profile.first_name} {profile.last_name}
          </Typography>
          <Typography id="modal-sub-title" variant="h6" component="h3">
            {profile.city}, {profile.state}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {profile.note}
          </Typography>

          {/* My Clips section */}
          <Typography sx={{ mt: 4 }} variant="subtitle1">My Clips</Typography>
          <ul>
            {links.length === 0 ? (
              <li>No clips found.</li>
            ) : (
              links.map(link => (
                <li key={link.id}>
                  {link.clip_to_link.includes("youtube.com") ? (
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${link.clip_to_link.split("=")[1]}`}
                      title={`YouTube video ${link.id}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <a href={link.clip_to_link} target="_blank" rel="noopener noreferrer">
                      {link.clip_to_link}
                    </a>
                  )}
                </li>
              ))
            )}
          </ul>
        </Box>
      </Modal>
    </div>
  );
}