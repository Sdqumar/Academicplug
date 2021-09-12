import React, { useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, makeStyles, Typography, Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import AuthContext from 'components/AuthContext';
import firebase from 'config/firebase-config';
import dynamic from 'next/dynamic';

const FormikControl = dynamic(
	() => import('../components/Formik/FormikControl')
);

const ForgetPassword = dynamic(() => import('components/ForgetPassword'));

const useStyles = makeStyles((theme) => ({
	login: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: '2rem',
		flexDirection: 'column',
		'& .MuiFormControl-root': {
			minWidth: '15rem',
			margin: '10px',
		},
	},
	forget: {
		display: 'none',
		zIndex: 10,
		position: 'absolute',
		width: '100%',
		minHeight: 'content-fit',
		padding: '1rem',

		'& .MuiButton-contained': {
			color: 'red',
		},
	},
}));

function SignIn() {
	const classes = useStyles();
	const initialValues = {
		email: '',
		input: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email format').required('Required'),
		password: Yup.string().required('Required'),
	});

	const router = useRouter();

	type values = {
		email: string;
		password: string;
	};
	const { enqueueSnackbar } = useSnackbar();
	const [, setCurrentUser] = useContext(AuthContext);

	const onSubmit = async (values: values, actions) => {
		const { getAuth, signInWithEmailAndPassword } = await import(
			'firebase/auth'
		);
		const auth = getAuth(firebase);

		actions.setSubmitting(true);

		signInWithEmailAndPassword(auth, values.email, values.password)
			.then(({ user }) => {
				const displayName = user.displayName;
				const uid = user.uid;
				setCurrentUser({ displayName, uid });
				Cookies.set('user', JSON.stringify({ displayName, uid }));
				enqueueSnackbar('Login Sucessful', {
					variant: 'success',
					autoHideDuration: 1000,
				});
				router.push('/');
			})
			.catch((error) => {
				enqueueSnackbar('Invalid Username or Password ', { variant: 'error' });
				console.log(error);
			});
	};
	const boxRef = useRef(null);

	const onClick = () => {
		boxRef.current.style.display = 'block';
	};
	const closeBox = () => {
		boxRef.current.style.display = 'none';
	};
	return (
		<>
			<Paper className={classes.forget} ref={boxRef}>
				<Button variant="contained" disableElevation onClick={closeBox}>
					Close
				</Button>
				<ForgetPassword />
			</Paper>
			<Box className={classes.login}>
				<Typography variant="h4">SIGN IN</Typography>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(formik) => {
						return (
							<Form>
								<Box>
									<FormikControl
										control="chakraInput"
										type="email"
										label="Email"
										name="email"
									/>
								</Box>
								<Box>
									<FormikControl
										control="chakraInput"
										type="password"
										label="Password"
										name="password"
									/>
								</Box>
								<Box>
									<Button onClick={onClick}>Forget Password?</Button>
								</Box>
								<Box mt="10px" textAlign="center">
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
		</>
	);
}

export default SignIn;
