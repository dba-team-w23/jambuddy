import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  const [reviews, setReviews] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const baseURL = `https://sea-turtle-app-zggz6.ondigitalocean.app/api/userreviewsforuser/`;
  const usersURL = `https://sea-turtle-app-zggz6.ondigitalocean.app/api/users/`;

  const handleOpen = (id) => {
    setOpen(true);
    const getData = async () => {
      try {
        const response = await fetch(`${baseURL}${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    getData();
  };

  return (
    <>
      <Button onClick={() => handleOpen(profile.id)}>Reviews</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2 className="text-lg mb-2">Reviews for {profile.username}</h2>
            {reviews.length > 0
              ? reviews.map((review, i) => (
                  <p key={i} className="m-2">
                    <i>{review.comment}</i>
                    <span className="font-bold">
                      {" "}
                      - {review.reviewer}, {review.reviewer_location}
                    </span>
                  </p>
                ))
              : "No reviews yet!"}
          </div>
        </Box>
      </Modal>
    </>
  );
}
