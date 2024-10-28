import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
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

export default function BasicModal({ form }: any) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");
  const [share, setShare] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const [copyMessage, setCopyMessage] = React.useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCopyMessage(null);
  };

  useEffect(() => {
    if (form) {
      setShare(form.permission);
    }
  }, [form]);

  const handleShare = async () => {
    setLoading(true);
    setError(null);

    const link = `https://final-form-five.vercel.app/dashboard/forms/${form.id}`;
    try {
      const res = await fetch(`/api/forms/${form.id}/share`, {
        method: "POST",
        body: JSON.stringify({
          email,
          form,
          permissionValue: share,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Failed to update form permission");
      } else {
        await navigator.clipboard.writeText(link);
        setCopyMessage("copied");

        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (share === -1) {
    return (
      <div className="mt-1.5">
        <Button onClick={handleOpen} className="text-gray-600">
          Share
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style} className="flex flex-col gap-8">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Loading...
            </Typography>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      </div>
    );
  }

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
          <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
          <h1>Selected Email</h1>
          <SelectButton share={share} setShare={setShare} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Link:{" "}
            {`https://final-form-five.vercel.app/dashboard/forms/${form.id}`}
          </Typography>
          {copyMessage && (
            <Typography variant="body2" color="green">
              {copyMessage}
            </Typography>
          )}
          <div className="flex gap-2 justify-end">
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleShare}>Share</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
