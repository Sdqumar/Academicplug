import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Box, Snackbar } from "@material-ui/core";
import firebase from "config/firebase-config";
import { useRouter } from "next/router";
import { updateDoc } from "firebase/firestore";
import { Alert } from "@material-ui/lab";

export default function AlertDialogExample({ text, style }) {
  const router = useRouter();

  const school = router.query.School.toString().replace(/-/g, " ");
  const course = router.query.Course.toString().replace(/-/g, " ");

  const handleDelete = async () => {
    const { doc, deleteDoc, getFirestore } = await import("firebase/firestore");
    const firestore = getFirestore(firebase);
    const docRef = await doc(
      firestore,
      "schools",
      school.replace(/\s/g, "-"),
      "courses",
      course.replace(/\s/g, "-")
    );
    try {
      if (text != "delete") {
        updateDoc(docRef, {
          Approve: text,
        }).then(()=>{
			setOpenDialog(false);
			setOpen(true);
		})
      } else {
        deleteDoc(docRef).then(()=>{
			setOpenDialog(false);
			setOpen(true);
		})
      }

	  
    } catch (error) {
		console.log(error);
		
	}
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="success">Material set to {text} successfully!</Alert>
      </Snackbar>
      <Box marginX={2}>
        <Button style={style} variant="contained" onClick={handleClickOpen}>
          {text}
        </Button>
      </Box>
      <Dialog
        maxWidth="sm"
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box fontSize="1.5rem" padding="1.5rem" fontWeight="500">
          {text === "Pending"
            ? `set material to ${text} ?`
            : `Are you sure you want to ${text} Material ?`}
        </Box>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <button onClick={handleDelete} className="closeBtn" autoFocus>
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
