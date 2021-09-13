import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';

import firebase from '../config/firebase-config';
import UploadPdf from '../components/UploadPdf';
import PrivateRoute from '../components/PrivateRoute';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@material-ui/core';
import toast, { Toaster } from 'react-hot-toast';

function AddSchool() {
	const initialValues = {
		SchoolName: '',
		Slug: '',
	};

	const validationSchema = Yup.object().shape({
		SchoolName: Yup.mixed().required('Required'),
		Slug: Yup.mixed().required('Required'),
	});

	const [logoUrl, setLogoUrl] = useState(null);
	const getFile = (url) => {
		setLogoUrl(url);
	};

	const onSubmit = async (values, actions) => {
		actions.setSubmitting(true);
		const school = values.SchoolName.trim();
		let slug = values.Slug.trim();
		slug = slug.charAt(0).charAt(0).toUpperCase() + slug.slice(1);
		slug = slug.replace(/\s/g, '-');

		const { doc, setDoc, getFirestore } = await import('firebase/firestore');

		const { getStorage, ref, uploadBytes, getDownloadURL } = await import(
			'firebase/storage'
		);

		const path = `school logo/${slug}`;

		const logoUpload = await uploadBytes(ref(getStorage(), path), logoUrl);

		const logoRef = await getDownloadURL(logoUpload.ref);

		//created a new courses array to the database for future adding of courses into the array
		const firestore = getFirestore(firebase);

		await setDoc(doc(firestore, 'schools', slug), {
			name: school,
			slug,
			logourl: logoRef,
		})
			.then(async () => {
				await setDoc(doc(firestore, 'schools', slug, 'admin', 'admin'), {
					admins: ['n49a6ko1tKdhuIIs30uft1eeBwO2'],
				});
			})

			.then(() => {
				toast.success('School Added Sucessfully!');
				actions.resetForm();
				actions.setSubmitting(false);
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="start"
			flexDirection="column"
			mt="1rem"
		>
			<Typography className="heading">Add School</Typography>
			<Box width="300px" mb="10">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(formik) => {
						return (
							<>
								<Form>
									<Box m="10px 0">
										<FormikControl
											control="chakraInput"
											type="name"
											label="School Slug"
											name="Slug"
										/>
									</Box>
									<Box m="10px 0">
										<FormikControl
											control="chakraInput"
											type="name"
											label="School Name"
											name="SchoolName"
										/>
									</Box>
								</Form>
								<Toaster position="top-center" />

								<UploadPdf
									getfile={getFile}
									label="image"
									size={{ byte: '1000000', mb: '1mb' }}
									type="image/png"
								/>
								<Box mt={4} textAlign="center">
									<Button
										variant="outlined"
										onClick={formik.submitForm}
										type="submit"
										disabled={!formik.isValid || logoUrl === null}
									>
										Submit
									</Button>
								</Box>
							</>
						);
					}}
				</Formik>
			</Box>
		</Box>
	);
}

export default PrivateRoute(AddSchool);
