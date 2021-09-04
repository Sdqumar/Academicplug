import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import {
	Flex,
	Spacer,
	Box,
	Button,
	Grid,
	useToast,
	Heading,
} from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import UploadSchoolImg from '../components/UploadSchoolImg';
import PrivateRoute from '../components/PrivateRoute';
import { useRouter } from 'next/router';

//initialize firestore
const firestore = firebase.firestore();

function AddSchool({ admin }) {
	const router = useRouter();

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
	const toast = useToast();

	const displayToast = () => {
		toast({
			title: 'School created',
			position: 'top',
			status: 'success',
			duration: 2000,
			isClosable: true,
		});
	};

	const onSubmit = (values, actions) => {
		actions.setSubmitting(true);

		const school = values.SchoolName.trim();
		let slug = values.Slug.trim();
		slug = slug.charAt(0).charAt(0).toUpperCase() + slug.slice(1);
		slug = slug.replace(/\s/g, '-');
		//created a new courses array to the database for future adding of courses into the array
		const Courses = [];
		firestore.collection('schools').doc(slug).set({
			logourl: logoUrl,
			name: school,
			slug,
		});

		firestore
			.collection('schools')
			.doc(slug)
			.collection('admin')
			.doc('admin')
			.set({
				admins: ['x1Fnwo5WimP9MwIjx4EWeQlyXpE3'],
			})
			.then(() => {
				actions.resetForm();
				displayToast();
				actions.setSubmitting(false);
				router.reload();
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	return (
		<Box d="block" m="auto" mt="1rem">
			<Heading size="lg" fontSize="50px">
				Add School
			</Heading>
			<Box align="center" justify="center" w="300px" mb="10">
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
								<Spacer />

								<UploadSchoolImg
									getFile={getFile}
									formik={formik.values.SchoolName}
								/>
								<Box mt={4} textAlign="center">
									<Button
										colorScheme="teal"
										variant="outline"
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
