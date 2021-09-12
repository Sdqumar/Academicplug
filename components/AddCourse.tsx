import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';

import { Box, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import UploadInput from './UploadPdf';
import { useContext } from 'react';
import AuthContext from '/components/AuthContext';

function AddCourse({ School, Faculty, Department }) {
	const data = {
		School,
		Faculty,
		Department,
	};
	let user: { displayName: String; uid: String } = useContext(AuthContext);
	user = {
		displayName: user?.displayName,
		uid: user?.uid,
	};
	const [pdfurl, setPdfurl] = useState(null);

	const getfile = (url) => {
		setPdfurl(url);
	};

	const router = useRouter();

	const initialValues = {
		Course: '',
	};
	const validationSchema = Yup.object().shape({
		Course: Yup.mixed().required('Required'),
	});

	const { enqueueSnackbar } = useSnackbar();

	const onSubmit = async (values, actions) => {
		const { getStorage, ref, uploadBytes, getDownloadURL } = await import(
			'firebase/storage'
		);

		const Course = values.Course.trim();

		actions.setSubmitting(true);
		const path = `${School}/${Faculty}/${Department}/${Course}`;

		const pdfUpload = await uploadBytes(ref(getStorage(), path), pdfurl);

		const pdfRef = await getDownloadURL(pdfUpload.ref);

		const { doc, setDoc, getFirestore } = await import('firebase/firestore');
		const firestore = getFirestore(firebase);

		await setDoc(
			doc(firestore, 'schools', School, 'courses', Course.replace(/\s/g, '-')),
			{
				Course,
				School,
				Faculty,
				Department,
				pdfRef,
				by: user,
			}
		)
			.then(() => {
				enqueueSnackbar('Course Added Sucessful', {
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
						<Box>
							<Form>
								<Box width="15rem" mt={2}>
									<FormikControl
										control="chakraInput"
										type="name"
										label="Course Name"
										name="Course"
									/>
								</Box>
							</Form>
							<UploadInput
								getfile={getfile}
								label="image"
								size={{ byte: '1000000', mb: '15' }}
							/>
							<Box mt={2} textAlign="center">
								<Button
									variant="outlined"
									type="submit"
									disabled={
										pdfurl === null || !formik.isValid || formik.isSubmitting
									}
									onClick={formik.submitForm}
								>
									Submit
								</Button>
							</Box>
						</Box>
					);
				}}
			</Formik>
		</Box>
	);
}
export default AddCourse;
