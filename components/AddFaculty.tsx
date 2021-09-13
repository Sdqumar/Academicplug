import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './Formik/FormikControl';
import firebase from '../config/firebase-config';
import { Box, Button } from '@material-ui/core';
import toast, { Toaster } from 'react-hot-toast';

function AddFaculty({ school }) {
	const initialValues = {
		faculty: '',
	};

	const validationSchema = Yup.object().shape({
		faculty: Yup.mixed().required('Required'),
	});

	const onSubmit = async (values, actions) => {
		actions.setSubmitting(true);

		const { doc, setDoc, getFirestore } = await import('firebase/firestore');
		const firestore = getFirestore(firebase);

		const faculty = values.faculty.trim();

		setDoc(doc(firestore, 'schools', school, 'faculty', faculty), {
			name: faculty,
			department: [],
		})
			.then(() => {
				toast.success('Faculty Added!');

				actions.resetForm();
				actions.setSubmitting(false);
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	return (
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
									label="Faculty Name"
									name="faculty"
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
	);
}

export default AddFaculty;
