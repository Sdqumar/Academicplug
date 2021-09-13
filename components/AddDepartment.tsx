import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';
import { Box, Button } from '@material-ui/core';
import toast, { Toaster } from 'react-hot-toast';

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
export default AddDepartment;
