import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Box } from '@material-ui/core';

export default function AlertDialogExample({ deleteFunction, name }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<button className="closeBtn" onClick={handleClickOpen}>
				Delete {name}
			</button>
			<Dialog
				maxWidth="sm"
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<Box fontSize="1.5rem" padding="1.5rem" fontWeight="500">
					Are you sure? You can't undo this action afterwards.
				</Box>

				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Disagree
					</Button>
					<button onClick={deleteFunction} className="closeBtn" autoFocus>
						Agree
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
