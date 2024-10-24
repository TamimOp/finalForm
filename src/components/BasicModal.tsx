import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useParams } from "next/navigation";
import { TextField } from "@mui/material";
import SelectButton from "./SelectButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 34,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams();
  const fid = params.fid;

  return (
    <div className="mt-1.5">
      <Button onClick={handleOpen} className="text-gray-600">
        Share
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col gap-8">
          <TextField id="demo-helper-text-misaligned-no-helper" label="Email" />
          <h1>Selected Email</h1>
          <SelectButton />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Link: {`/dashboard/forms/${fid}`}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
