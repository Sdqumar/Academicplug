import { Flex, ChakraProvider, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import firebase from '../config/firebase-config';
import Hearder from '../components/Header';
import AuthContext from '../components/AuthContext';
import Footer from '../components/Footer';

import { extendTheme } from '@chakra-ui/react';
const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
};
const theme = extendTheme({ colors });

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
			<ChakraProvider theme={theme}>
				<AuthContext.Provider value={currentUser}>
					<Flex
						flexDir="column"
						justify="space-between"
						maxW="100vw"
						height="100vh"
					>
						<Hearder />
						<Box flex="auto" w="92vw" m="auto">
							<Component {...pageProps} />
						</Box>
						<Footer />
					</Flex>
				</AuthContext.Provider>
			</ChakraProvider>
		)
	);
}

export default MyApp;
