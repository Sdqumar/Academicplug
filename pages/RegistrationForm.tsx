import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import { Button } from '@chakra-ui/react';
import { Flex, Spacer, Text, useToast } from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';

function RegistrationForm() {
	const initialValues = {
		email: '',
		password: '',
		confirmPassword: '',
		username: '',
	};

	const lowercaseRegex = /(?=.*[a-z])/;
	const uppercaseRegex = /(?=.*[A-Z])/;
	const numericRegex = /(?=.*[0-9])/;

	const validationSchema = Yup.object({
		username: Yup.string().required('Required'),
		email: Yup.string().email('Invalid email format').required('Required'),

		password: Yup.string()
			.required('Required')
			.matches(lowercaseRegex, 'One lowercase required!')
			.matches(numericRegex, 'One number required!')
			.min(4, 'Minimum 4 character required!'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), ''], 'Passwords must match')
			.required('Required'),
	});

	const router = useRouter();

	type values = {
		email: string;
		password: string;
		username: string;
	};

	const toast = useToast();
	console.log();
	const displayToast = (title, status) => {
		toast({
			title,
			position: 'top',
			status,
			duration: 4000,
			isClosable: true,
		});
	};
	const onSubmit = (values: values) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(values.email, values.password)
			.then(() => {
				const user = firebase.auth().currentUser;
				user
					.updateProfile({
						displayName: values.username,
					})
					.then(() => {
						firebase.firestore().collection('users').doc(user.uid).set({
							displayName: user.displayName,
							email: user.email,
						});
					})
					.then(() => {
						displayToast('Registration Successful', 'success');
						router.push('/');
					});
			})
			.catch((error) => {
				displayToast('Email Already Exist', 'error');
			});
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => {
				return (
					<Flex
						align="center"
						flex-wrap="wrap"
						justify="center"
						h="content-fit"
						m="2rem 0"
					>
						<Text align="center" fontSize="2rem" m="0 2rem" mb="2rem">
							REGISTER
						</Text>
						<Form>
							<FormikControl
								control="chakraInput"
								type="username"
								label="Username"
								name="username"
							/>
							<FormikControl
								control="chakraInput"
								type="email"
								label="Email"
								name="email"
							/>
							<FormikControl
								control="chakraInput"
								type="password"
								label="Password"
								name="password"
							/>
							<FormikControl
								control="chakraInput"
								type="password"
								label="Confirm Password"
								name="confirmPassword"
							/>

							<Button
								colorScheme="teal"
								variant="outline"
								type="submit"
								mt={2}
								disabled={!formik.isValid}
							>
								Submit
							</Button>
						</Form>
					</Flex>
				);
			}}
		</Formik>
	);
}

export default RegistrationForm;
