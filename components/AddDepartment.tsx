import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';
import { Box, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

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

	const { enqueueSnackbar } = useSnackbar();

	const onSubmit = async (values, actions) => {
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
				enqueueSnackbar('Department Added Sucessful', {
					variant: 'success',
					autoHideDuration: 1000,
				});
				actions.resetForm();
				actions.setSubmitting(false);
				router.reload();
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
									label="Department Name"
									name="department"
								/>
							</Box>

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
export default AddDepartment;
