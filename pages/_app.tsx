import Grid from '@material-ui/core/Grid';
import { useEffect } from 'react';
import { useState } from 'react';
import firebase from '../config/firebase-config';
//import Header from '../components/Header';
import AuthContext from '../components/AuthContext';
//import Footer from '../components/Footer';
//import '../styles/globals.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

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
			<AuthContext.Provider value={currentUser}>
				<CssBaseline />
				<Button variant="contained">Default</Button>
				<Button variant="contained" color="primary">
					Primary
				</Button>
				{/* <Grid
						templateRows="6rem auto 4rem"
						templateColumns="auto"
						height="100vh"
						maxW="100%"
						overflow-x="hidden"
					>
						<Header />

						<Flex
							w="100%"
							m={{ base: 'auto', md: '1px' }}
							mt={{ base: '0', md: '0rem' }}
							position="relative"
							overflow-x="hidden"
						>
							<Component {...pageProps} />
						</Flex>
						<Footer />
					</Grid> */}
			</AuthContext.Provider>
		)
	);
}

export default MyApp;
