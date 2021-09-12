import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import {
	Box,
	Button,
	Grid,
	makeStyles,
	Typography,
	Link,
} from '@material-ui/core';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

//initialize firestore

function ForgetPassword() {
	const router = useRouter();

	const initialValues = {
		Email: '',
	};
	const validationSchema = Yup.object().shape({
		Email: Yup.string().required('Required').email('Invalid email format'),
	});

	const onSubmit = (values, actions) => {
		const auth = getAuth(firebase);
		actions.setSubmitting(true);

		sendPasswordResetEmail(auth, values.email)
			.then(() => {
				actions.resetForm();
				actions.setSubmitting(false);
				setTimeout(() => router.reload(), 5000);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Box mt="20px" display="flex" justifyContent="center">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{(formik) => {
					return (
						<Form>
							<Box>
								<Typography>Please Enter your Emaill Address</Typography>
								<FormikControl
									control="chakraInput"
									type="name"
									label="Email Address"
									name="Email"
									width="30rem"
								/>
							</Box>

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
export default ForgetPassword;
