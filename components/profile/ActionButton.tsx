import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Box } from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast";
import { handleAction } from "./utils";

export default function ActionButton({ text, style, selected }) {
  // const handleDelete = async () => {
  // 	const { doc, deleteDoc, getFirestore } = await import('firebase/firestore');
  // 	const firestore = getFirestore(firebase);
  // 	const docRef = await doc(
  // 		firestore,
  // 		'schools',
  // 		school.replace(/\s/g, '-'),
  // 		'courses',
  // 		course.replace(/\s/g, '-')
  // 	);

  // 	deleteDoc(docRef)
  // 		.then(() => {
  // 			setTimeout(() => router.back(), 1500);
  // 			toast.success('Material Removed Sucessful!');
  // 		})
  // 		.catch((error) => {
  // 			console.error('Error removing document: ', error);
  // 		});
  // };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={style}
        disabled={selected.length < 1}
      >
        {text}
      </Button>
      <Dialog
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box fontSize="1.5rem" padding="1.5rem" fontWeight="500">
          {text === "delete"
            ? `Are you sure? You can't undo this action afterwards.`
            : `Are you sure?`}
        </Box>
        <Toaster position="top-center" />

        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>

          <button
            className="closeBtn"
            autoFocus
            onClick={() => handleAction(text, selected)}
            color="primary"
          >
            Agree
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
