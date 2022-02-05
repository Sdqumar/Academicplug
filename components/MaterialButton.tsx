import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Box } from '@material-ui/core';
import firebase from 'config/firebase-config';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function AlertDialogExample({text,style}) {


	const router = useRouter();

  const school = router.query.School.toString().replace(/-/g, " ");
  const faculty = router.query.Faculty.toString().replace(/-/g, " ");
  const department = router.query.Department.toString().replace(/-/g, " ");
  const course = router.query.Course.toString().replace(/-/g, " ");


	const handleDelete = async () => {
		const { doc, deleteDoc, getFirestore } = await import('firebase/firestore');
		const firestore = getFirestore(firebase);
		const docRef = await doc(
			firestore,
			'schools',
			school.replace(/\s/g, '-'),
			'courses',
			course.replace(/\s/g, '-')
		);

		deleteDoc(docRef)
			.then(() => {
				setTimeout(() => router.back(), 1500);
				toast.success('Material Removed Sucessful!');
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Box marginX={2}>
			<Button style={style} variant="contained"  onClick={handleClickOpen}>
				{text}
			</Button>
			</Box>
			<Dialog
				maxWidth="sm"
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<Box fontSize="1.5rem" padding="1.5rem"  fontWeight="500">
				{text === "Pending"?
					`set material to ${text} ?` 
					:
					`Are you sure you want to ${text} Material ?` 
				}
				</Box>
				<Toaster position="top-center" />

				<DialogActions>
					<Button onClick={handleClose} color="primary">
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
