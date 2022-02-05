import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Box, Snackbar } from "@material-ui/core";
import { handleAction } from "./utils";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";
export default function ActionButton({ text, style, selected }) {
 
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
        {text === "Pending"?
					`set material to ${text} ?` 
					:
					`Are you sure you want to ${text} Material ?` 
				}
        </Box>

        <DialogActions>
          <Button onClick={handleDialogClose}>No</Button>

          <button
            className="closeBtn"
            autoFocus
            onClick={handleSubmit}
            color="primary"
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
