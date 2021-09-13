import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import firebase from 'config/firebase-config';

import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import AuthContext from 'components/AuthContext';

import dynamic from 'next/dynamic';

const FormikControl = dynamic(
	() => import('../components/Formik/FormikControl')
);
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
	const [currentUser, setCurrentUser] = useContext(AuthContext);

	const onSubmit = async (values: values, actions) => {
		actions.setSubmitting(true);

		const displayName = values.username.toString();
		const email = values.email.toString();

		const { doc, setDoc, getDocs, getFirestore, collection, query, where } =
			await import('firebase/firestore');
		const firestore = getFirestore(firebase);

		const q = query(
			collection(firestore, 'users'),
			where('displayName', '==', displayName)
		);
		const querySnapshot = await getDocs(q);

		if (querySnapshot.docs.length !== 0) {
			toast.error('Username has Already been taken!');

			actions.setSubmitting(false);
		} else {
			const { getAuth, createUserWithEmailAndPassword, updateProfile } =
				await import('firebase/auth');
			const auth = getAuth(firebase);

			createUserWithEmailAndPassword(auth, values.email, values.password)
				.then(({ user }) => {
					updateProfile(auth.currentUser, {
						displayName,
					});

					const uid = user.uid;

					setDoc(doc(firestore, 'users', uid), {
						email,
						displayName,
					});
					setCurrentUser({ displayName, uid });
					Cookies.set('user', JSON.stringify({ displayName, uid }));
				})
				.then(() => {
					toast.success('SignUp Sucessfully!');

					actions.setSubmitting(false);
				})

				.catch((error) => {
					toast.error('Email has Already been taken!');

					actions.setSubmitting(false);
				});
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{(formik) => {
				return (
					<Box
						alignItems="center"
						justifyContent="center"
						maxWidth="15rem"
						height="content-fit"
						m="auto"
						mt="1rem"
						display="flex"
						flexWrap="wrap"
					>
						<Typography className="heading">SIGN UP</Typography>
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
							<Toaster position="top-center" />

							<Box m="10px 0" textAlign="center">
								{' '}
								<Button
									variant="outlined"
									type="submit"
									disabled={!formik.isValid}
								>
									Submit
								</Button>
							</Box>
						</Form>
					</Box>
				);
			}}
		</Formik>
	);
}

export default RegistrationForm;
