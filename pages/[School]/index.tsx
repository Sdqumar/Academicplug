import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Box, Typography } from '@material-ui/core';
import firebase from 'config/firebase-config';

import dynamic from 'next/dynamic';
const CoursesGrid = dynamic(() => import('components/CoursesGrid'));

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [
		{
			params: { School: 'Futminna' },
		},
	];
	return { paths, fallback: 'blocking' };
};

export async function getStaticProps(context) {
	const { getDocs, getFirestore, collection } = await import(
		'firebase/firestore'
	);
	const firestore = getFirestore(firebase);

	const school = context.params.School;
	const q = await getDocs(collection(firestore, 'schools', school, 'faculty'));
	const data = q.docs.map((doc) => doc.data());

	return {
		props: {
			data,
		},
		revalidate: 10000,
	};
}
const School = ({ data }) => {
	const router = useRouter();
	const school = router.query.school;
	const School = router.query.School;

	const list = data.map((item) => item?.name);

	return (
		<Box mt="1rem" pl="1rem">
			<Typography variant="h3" className="heading">
				{school ? school : School}
			</Typography>
			<CoursesGrid list={list} url={`/${School}`} />
		</Box>
	);
};

export default School;
