import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import { Flex, Spacer, Box, Button, useToast } from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';

//initialize firestore
const firestore = firebase.firestore();

function AddDepartment() {
	const router = useRouter();

	const initialValues = {
		department: '',
	};
	const validationSchema = Yup.object().shape({
		department: Yup.mixed().required('Required'),
	});

	const toast = useToast();
	const displayToast = () => {
		toast({
			title: 'Department Added Successfully',
			position: 'top',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
	};
	const school: string = router.query.School;
	const faculty: string = router.query.Faculty;

	const onSubmit = (values, actions) => {
		const department = values.department;
		actions.setSubmitting(true);

		firestore
			.collection('schools')
			.doc(school)
			.collection('faculty')
			.doc(faculty)
			.update({
				department: firebase.firestore.FieldValue.arrayUnion(department),
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
		<Flex align="center" justify="center" mb="2rem">
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

							<Spacer />
							<Box mt={4} textAlign="center">
								<Button
									colorScheme="teal"
									variant="outline"
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
		</Flex>
	);
}
export default AddDepartment;
