import { Flex, Grid, ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import firebase from '../config/firebase-config';
import Header from '../components/Header';
import AuthContext from '../components/AuthContext';
import Footer from '../components/Footer';
import '../styles/globals.css';

import { extendTheme } from '@chakra-ui/react';

const Link = {
	baseStyle: {
		textDecoration: 'none',
	},
};

const colors = {
	primary: '#fbae17',
};
const theme = extendTheme({ colors, Link });

function MyApp({ Component, pageProps }) {
	const [currentUser, setCurrentUser] = useState<undefined | {}>(undefined);
	const [loading, setLoading] = useState(true);
	const auth = firebase.auth();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, [currentUser]);

	return (
		!loading && (
			<h1>sdd</h1>
			// <ChakraProvider theme={theme}>
			// 	<AuthContext.Provider value={currentUser}>
			// 		<Grid
			// 			templateRows="6rem auto 4rem"
			// 			templateColumns="auto"
			// 			height="100vh"
			// 			maxW="100%"
			// 			overflow-x="hidden"
			// 		>
			// 			<Header />

			// 			<Flex
			// 				w="100%"
			// 				m={{ base: 'auto', md: '1px' }}
			// 				mt={{ base: '0', md: '0rem' }}
			// 				position="relative"
			// 				overflow-x="hidden"
			// 			>
			// 				<Component {...pageProps} />
			// 			</Flex>
			// 			<Footer />
			// 		</Grid>
			// 	</AuthContext.Provider>
			// </ChakraProvider>
		)
	);
}

export default MyApp;
