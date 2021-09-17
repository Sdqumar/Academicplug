// import { Formik, Form, Field } from 'formik';
// import { Box, Button, useToast, Textarea } from '@chakra-ui/react';
// import firebase from '../config/firebase-config';
// import moment from 'moment';
// import { useContext, useState, useEffect } from 'react';
// import AuthContext from '/components/AuthContext';
// import { FormControl, FormErrorMessage } from '@chakra-ui/react';

// //initialize firestore
// const firestore = firebase.firestore();

function Reply() {
// 	interface values {
// 		suggestion?: string;
// 	}
// 	let loginUser: { displayName: String } = useContext(AuthContext);

// 	let user = loginUser?.displayName;

// 	const toast = useToast();

// 	const displayToast = () => {
// 		toast({
// 			title: 'Thank you for your input',
// 			position: 'top',
// 			status: 'success',
// 			duration: 2000,
// 			isClosable: true,
// 		});
// 	};

// 	function validateName(value) {
// 		let error;
// 		if (!value) {
// 			error = 'Required';
// 		}
// 		return error;
// 	}
// 	const onSubmit = (values, actions) => {
// 		actions.setSubmitting(true);

// 		let { Reply } = values;

// 		firestore
// 			.collection('suggestions')
// 			.doc(id)
// 			.update({
// 				replies: firebase.firestore.FieldValue.arrayUnion({
// 					Reply,
// 					user,
// 					timestamp: moment().format('MMMM Do YYYY, h:mm a'),
// 				}),
// 			})
// 			.then(() => {
// 				actions.resetForm();
// 				displayToast();
// 				actions.setSubmitting(false);
// 				boxRef.current.style.display = 'none';
// 			})
// 			.catch((error) => {
// 				console.error('Error writing document: ', error);
// 			});
// 	};

// 	const closeBox = () => {
// 		boxRef.current.style.display = 'none';
// 	};

// 	return (
// 		<Box bg="#fff" m="1rem 0" p="1rem 0.5rem" borderRadius="10px" ref={boxRef}>
// 			<Formik initialValues={{ Reply: '' }} onSubmit={onSubmit}>
// 				{(props) => (
// 					<Form>
// 						<Field name="Reply" validate={validateName}>
// 							{({ field, form }) => (
// 								<FormControl
// 									isInvalid={form.errors.Reply && form.touched.Reply}
// 								>
// 									<Textarea {...field} id="Reply" placeholder="Reply" />
// 									<FormErrorMessage>{form.errors.Reply}</FormErrorMessage>
// 								</FormControl>
// 							)}
// 						</Field>
// 						<Button
// 							mt={4}
// 							colorScheme="teal"
// 							isLoading={props.isSubmitting}
// 							type="submit"
// 						>
// 							Reply
// 						</Button>
// 						<Button mt={4} ml={4} onClick={closeBox} colorScheme="red">
// 							Close
// 						</Button>
// 					</Form>
// 				)}
// 			</Formik>
// 		</Box>
// 	);
}

export default Reply;
