import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Box, Snackbar } from "@material-ui/core";
import { handleAction } from "./utils";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";
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

  const [openDialog, setOpenDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(null);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
const router =useRouter()
  const handleSubmit = async () => {
    const res = await handleAction(text, selected);
    setOpen(true);
    setIsSuccess(res);
    setOpenDialog(false);
    setTimeout(()=>router.reload(),3000)
  };
  return (
    <div>
      <Snackbar 
       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="success">Material set to {text} successfully!</Alert>
      </Snackbar>
      <Box marginRight={1}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={style}
        disabled={selected.length < 1}
        >
        {text}
      </Button>
        </Box>
      <Dialog
        maxWidth="sm"
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box fontSize="1.5rem" padding="1.5rem" fontWeight="500">
          {text} Material?
        </Box>

        <DialogActions>
          <Button onClick={handleDialogClose}>Disagree</Button>

          <button
            className="closeBtn"
            autoFocus
            onClick={handleSubmit}
            color="primary"
          >
            Agree
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
