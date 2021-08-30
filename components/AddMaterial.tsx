import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './Formik/FormikControl';
import { Flex, Spacer, Box, Button, useToast } from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';
import UploadInput from './UploadPdf';
import { useContext } from 'react';
import AuthContext from '/components/AuthContext';

//initialize firestore
const firestore = firebase.firestore();

function AddMaterial() {
	const router = useRouter();
	let user: { displayName: String; uid: String } = useContext(AuthContext);
	user = {
		displayName: user?.displayName,
		uid: user?.uid,
	};
	const [pdfurl, setPdfurl] = useState(null);

	const slug = router.query.School;
	const school = router.query.School.toString().replace(/-/g, ' ');
	const faculty = router.query.Faculty.toString().replace(/-/g, ' ');
	const department = router.query.Department.toString().replace(/-/g, ' ');
	const course = router.query.Course.toString().replace(/-/g, ' ');

	const data = { school, faculty, department, course };

	const getfile = (url) => {
		setPdfurl(url);
	};
	const initialValues = {
		Material: '',
	};
	const validationSchema = Yup.object().shape({
		Material: Yup.mixed().required('Required'),
	});

	const toast = useToast();
	const displayToast = () => {
		toast({
			title: 'Material Added Successfully',
			position: 'top',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
	};

	const onSubmit = (values, actions) => {
		const material = values.Material.trim();
		actions.setSubmitting(true);
		firestore
			.collection('schools')
			.doc(slug)
			.collection('courses')
			.doc(course.replace(/\s/g, '-'))
			.update({
				Materials: firebase.firestore.FieldValue.arrayUnion({
					Name: material,
					pdfurl,
					user,
				}),
			})
			.then(() => {
				displayToast();
				actions.resetForm();
				actions.setSubmitting(false);
				router.reload();
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	return (
		<Flex>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{(formik) => {
					return (
						<Box m="auto" maxW="30rem" mb="1rem">
							<Form>
								<Box>
									<FormikControl
										control="chakraInput"
										type="name"
										label="Material Name"
										name="Material"
									/>
								</Box>
							</Form>
							<Spacer />
							<UploadInput
								getfile={getfile}
								data={data}
								formik={formik.values.Material}
							/>
							<Box mt={4} textAlign="center">
								<Button
									colorScheme="teal"
									variant="outline"
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
		</Flex>
	);
}
export default AddMaterial;
