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

  const getData = async () => {
    try {
      const baseURL = "https://sea-turtle-app-zggz6.ondigitalocean.app/api/";
      const url = `${baseURL}userclips/${profile.id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response is not ok");
      }
      const data = await response.json();
      setLinks(data);
      console.log("linkdata", data);
    } catch (error) {
      console.error("There was an error", error);
    }
  };
  React.useEffect(() => {
    getData();
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
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {profile.first_name} {profile.last_name}
          </Typography>
          <Typography id="modal-sub-title" variant="h6" component="h3">
            {profile.city}, {profile.state}
          </Typography>
          <Typography id="modal-sub-title" variant="h6" component="h3">
            Instruments: {profile.instrument_names}
          </Typography>
          <Typography id="modal-sub-title" variant="h6" component="h3">
            Genres: {profile.genre_names}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {profile.note}
          </Typography>

          {/* My Clips section */}
          <Typography sx={{ mt: 4 }} variant="subtitle1">
            My Clips
          </Typography>
          <ul>
            {links.length === 0 ? (
              <li>No clips found.</li>
            ) : (
              links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.link}
                    target="_blank"
                    style={{
                      color: "blue",
                      textDecoration: "none",
                      ":hover": { textDecoration: "underline" },
                    }}
                  >
                    {link.link}
                  </a>
                </li>
              ))
            )}
          </ul>
        </Box>
      </Modal>
    </div>
  );
}
