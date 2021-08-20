import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import { Flex, Spacer, Box, Button, useToast } from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';

//initialize firestore
const firestore = firebase.firestore();

function AddCourse({ School, Faculty, Department }) {
	const router = useRouter();

	const initialValues = {
		Course: '',
	};
	const validationSchema = Yup.object().shape({
		Course: Yup.mixed().required('Required'),
	});

	const toast = useToast();
	const displayToast = () => {
		toast({
			title: 'Course Added Successfully',
			position: 'top',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
	};

	const onSubmit = (values, actions) => {
		const Course = values.Course;
		actions.setSubmitting(true);

		firestore
			.collection('Schools')
			.doc(School)
			.collection('Courses')
			.doc(Course)
			.set({
				Course,
				School,
				Faculty,
				Department,
				Materials: [],
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
									label="Course Name"
									name="Course"
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
export default AddCourse;
