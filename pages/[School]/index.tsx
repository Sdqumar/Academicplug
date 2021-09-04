import firebase from '../../config/firebase-config';
import { Container, Heading, Box } from '@chakra-ui/react';
import GridOne from '../../components/GridOne';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import CoursesGrid from 'components/CoursesGrid';

const firestore = firebase.firestore();

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [
		{
			params: { School: 'Futminna' },
		},
	];
	return { paths, fallback: 'blocking' };
};

export async function getStaticProps(context) {
	const school = context.params.School;

	const dataRef = await firestore
		.collection('schools')
		.doc(school)
		.collection('faculty')
		.get();
	const result = dataRef.docs.map((doc) => doc.data());
	const data = result === undefined ? result === null : result;

	return {
		props: {
			data,
		},
		revalidate: 10,
	};
}

const School = ({ data }) => {
	const router = useRouter();
	const school = router.query.school;
	const School = router.query.School;
	const list = data.map((item) => item?.name);

	return (
		<Box mt="1rem" pl="1rem">
			<Heading d="block" size="lg" fontSize="5vh">
				{school ? school : School}
			</Heading>
			<CoursesGrid list={list} url={School} />
		</Box>
	);
};

export default School;
