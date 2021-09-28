import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';
import { Box, Button,Typography } from '@material-ui/core';
import toast, { Toaster } from 'react-hot-toast';
import Dialog from '@material-ui/core/Dialog';
import React, {useState} from 'react';
//initialize firestore

function AddDepartment() {
	const router = useRouter();

	const initialValues = {
		department: '',
	};
	const validationSchema = Yup.object().shape({
		department: Yup.mixed().required('Required'),
	});

	const school = router.query.School.toString();
	const faculty = router.query.Faculty.toString();

	const onSubmit = async (values, actions) => {
		const { getAuth } = await import(
			"firebase/auth"
		  );
		 getAuth(firebase);
		 
		const department = values.department;
		actions.setSubmitting(true);

		const { doc, updateDoc, getFirestore, arrayUnion } = await import(
			'firebase/firestore'
		);
		const firestore = getFirestore(firebase);
		updateDoc(doc(firestore, 'schools', school, 'faculty', faculty), {
			department: arrayUnion(department),
		})
			.then(() => {
				toast.success('Department Added!');

				actions.resetForm();
				actions.setSubmitting(false);
				router.reload();
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};
	const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
	return (
		<>
            <Button variant="outlined"
                onClick={handleClickOpen}>
                Add Department
            </Button>
            <Dialog open={open}
                onClose={handleClose}
				maxWidth={'lg'}
				fullWidth={true}
				className='AddDialog'
				>
                <Box justifyContent="space-between" mt="1rem"
                    ml={
                        {
                            xs: '10px',
                            md: '2rem'
                        }
                }>
					 <button className='closeBtn'
                        onClick={handleClose}>
                        Close
                    </button>
                    <Typography className="heading">Add Department</Typography>
                   
                </Box>
				<Box
			alignItems="center"
			justifyContent="center"
			mb="2rem"
			m="auto"
			display="flex"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{(formik) => {
					return (
						<Form>
							<Box mt="20px">
								<FormikControl
									control="chakraInput"
									type="name"
									label="Department Name"
									name="department"
								/>
							</Box>
							<Toaster position="top-center" />

							<Box mt={2} textAlign="center">
								<Button
									variant="outlined"
									type="submit"
									disabled={!formik.isValid}
								>
									Submit
								</Button>
							</Box>
						</Form>
					);
				}}
			</Formik>
		</Box>
              
            </Dialog>
        </>
	
	);
}

export default AddDepartment;
