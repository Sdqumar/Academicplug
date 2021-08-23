import { Flex, Container } from '@chakra-ui/react';
import BannerHome from 'components/BannerHome';
import SchoolGridList from 'components/SchoolGridList';
import firebase from 'config/firebase-config';

const firestore = firebase.firestore();
// .enablePersistence()
// .catch((err) => {
// 	if (err.code == 'failed-precondition') {
// 		// Multiple tabs open, persistence can only be enabled
// 		// in one tab at a a time.
// 		// ...
// 	} else if (err.code == 'unimplemented') {
// 		// The current browser does not support all of the
// 		// features required to enable persistence
// 		// ...
// 	}
// });

export async function getStaticProps() {
	const dataref = await firestore.collection('schools').get();

	const data = dataref.docs.map((doc) => doc.data());

	return {
		props: {
			data,
		},
		revalidate: 10,
	};
}

const Index = ({ data }) => {
	return (
		<>
			<Flex justifyContent="center" direction="column">
				<BannerHome />
				<SchoolGridList schools={data} />
			</Flex>
		</>
	);
};

export default Index;
