import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';

import { Box, Button } from '@material-ui/core';

import UploadInput from './UploadPdf';
import { useContext } from 'react';
import AuthContext from '/components/AuthContext';

import toast, { Toaster } from 'react-hot-toast';

function AddCourse({ School, Faculty, Department }) {
	let [currentUser] = useContext(AuthContext);

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
				by: currentUser,
			}
		)
			.then(() => {
				toast.success('Course Added!');
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
								label="pdf"
								size={{ byte: '10000000', mb: '15mb' }}
								type="application/pdf"
							/>
							<Toaster position="top-center" />
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
