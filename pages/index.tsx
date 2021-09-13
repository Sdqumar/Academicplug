import { Box } from '@material-ui/core';
import firebase from 'config/firebase-config';

import dynamic from 'next/dynamic';
const BannerHome = dynamic(() => import('components/BannerHome'));
const SchoolGridList = dynamic(() => import('components/SchoolGridList'));

export async function getStaticProps() {
	const { getDocs, getFirestore, collection } = await import(
		'firebase/firestore'
	);
	const firestore = await getFirestore(firebase);

	const q = await getDocs(collection(firestore, 'schools'));
	const data = q.docs.map((doc) => doc.data());

	return {
		props: {
			data,
		},
		revalidate: 100000,
	};
}

const Index = ({ data }) => {
	return (
		<>
			<Box
				justifyContent="center"
				maxWidth={{ md: '95%', base: '100%' }}
				mt={{ base: '0px', sm: '2rem' }}
				m="auto"
				display="block"
			>
				<BannerHome />
				<SchoolGridList schools={data} />
			</Box>
		</>
	);
};

export default Index;
