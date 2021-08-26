import React, { useContext, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import { Flex, Spacer, useToast, Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import { useRouter } from 'next/router';
import ForgetPassword from 'components/ForgetPassword';

function LoginForm() {
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

	const toast = useToast();

	const displayToast = (
		title: string,
		status: 'success' | 'error' | 'info' | 'warning'
	) => {
		toast({
			title: title,
			position: 'top',
			status: status,
			duration: 2000,
			isClosable: true,
		});
	};

	const onSubmit = (values: values) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(values.email, values.password)
			.then((userCredential) => {
				displayToast('Login Sucessful', 'success');
				router.push('/');
			})
			.catch((error) => {
				displayToast('Invalid Username or Password ', 'error');
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
			<Box
				d="none"
				zIndex="10"
				boxShadow="base"
				rounded="md"
				ref={boxRef}
				pos="absolute"
				bg="#fff"
				width="100%"
				top="6rem"
				minH="content-fit"
				p="1rem 0"
			>
				<Button color="red" float="right" p="1.5rem" onClick={closeBox}>
					Close
				</Button>
				<ForgetPassword />
			</Box>
			<Box
				align="center"
				justify="center"
				maxW="18rem"
				h="content-fit"
				m="auto"
			>
				<Text align="center" fontSize="2rem" m="0 2rem">
					LOGIN
				</Text>
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
										//control='input'
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
								<Box mt="10px">
									<Text color="teal" cursor="pointer" onClick={onClick}>
										Forget Password?
									</Text>
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
			</Box>
		</>
	);
}

export default LoginForm;
