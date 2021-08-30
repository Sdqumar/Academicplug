import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import {
	Flex,
	Spacer,
	Box,
	Button,
	useToast,
	Heading,
	Text,
} from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import moment from 'moment';

//initialize firestore
const firestore = firebase.firestore();
firestore.collection('Suggestions');

export async function getStaticProps() {
	const dataref = await firestore.collection('suggestions').get();

	let data = dataref.docs.map((doc) => doc.data());

	data = data.map((item) => {
		return { ...item, timestamp: item.timestamp };
	});
	data = JSON.stringify(data);

	const id = dataref.docs.map((doc) => doc.id);
	return {
		props: {
			data,
			id,
		},
		revalidate: 10,
	};
}

function Suggestion({ data: result, id }) {
	const data = JSON.parse(result);

	interface values {
		suggestion?: string;
		name?: string;
	}

	const initialValues = {
		suggestion: '',
		name: '',
	};

	const validationSchema = Yup.object().shape({
		suggestion: Yup.mixed().required('Required'),
		name: Yup.mixed().required('Required'),
	});
	const toast = useToast();

	const displayToast = () => {
		toast({
			title: 'Thank you for your input',
			position: 'top',
			status: 'success',
			duration: 2000,
			isClosable: true,
		});
	};

	const onSubmit = (values, actions) => {
		actions.setSubmitting(true);

		const { name, suggestion } = values;

		firestore
			.collection('suggestions')
			.add({
				name,
				suggestion,
				timestamp: moment().format('MMMM Do YYYY, h a'),
			})
			.then(() => {
				actions.resetForm();
				displayToast();
				actions.setSubmitting(false);
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	return (
		<Box d="block" m="auto" mt="1rem">
			<Heading size="lg" fontSize="50px" m="1rem">
				Suggestions
			</Heading>
			<Box maxW="41rem" m="auto" ml="10px">
				<Heading fontSize="20px">
					Do you have any suggestion, idea, issue or complain about the site ?
				</Heading>
				<Heading fontSize="20px">
					Please feel free to comment down below.
				</Heading>
			</Box>

			<Flex align="center" justify="center">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(formik) => {
						return (
							<Form>
								<Box mt="20px" mb="10px">
									<FormikControl
										control="chakraInput"
										type="name"
										label="Name"
										name="name"
									/>
								</Box>
								<Box w={{ md: '30rem', base: '17rem' }} h="10rem">
									<FormikControl
										control="textarea"
										label="Suggestion"
										name="suggestion"
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

			<Box mt="2rem">
				<Flex justify="center" m="auto" w="80%" flexDir="column">
					{data.map((item) => {
						return (
							<Box
								border="2px solid #e2e2e2"
								d="block"
								maxW={{ base: '96vw', md: '70vw' }}
								borderRadius="6px"
								p="0.3rem"
								bg="#d4d2cd1c"
								mb="1rem"
								key={item.id}
							>
								<Flex>
									<Heading fontSize="1rem" m="0 10px">
										{item?.name}
									</Heading>
									<Text>{item.timestamp}</Text>
								</Flex>

								<Text ml="10px" mt="10px">
									{item?.suggestion}
								</Text>
							</Box>
						);
					})}
				</Flex>
			</Box>
		</Box>
	);
}

export default Suggestion;
