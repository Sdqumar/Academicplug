import { useEffect } from 'react';
import { useState } from 'react';
import AuthContext from '../components/AuthContext';
import Footer from '../components/Footer';
import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Cookies from 'js-cookie';

import dynamic from 'next/dynamic';
const Header = dynamic(() => import('components/Header'));

const theme = createTheme({
	palette: {
		primary: {
			main: '#000',
			dark: '#e53e3e',
		},
		secondary: {
			main: '#fbae17',
		},
	},
});

function MyApp({ Component, pageProps }) {
	const [currentUser, setCurrentUser] = useState<undefined | {}>(undefined);

	useEffect(() => {
		if (Cookies.get('user') === undefined) {
			Cookies.set('user', null);
		}

		setCurrentUser(JSON.parse(Cookies.get('user')));
	}, []);

	return (
		<AuthContext.Provider value={[currentUser, setCurrentUser]}>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<Box
						width="inherit"
						display="flex"
						flexDirection="column"
						justifyContent="space-between"
						minHeight="100vh"
					>
						<Header />
						<Box
							height="inherit"
							display="flex"
							flexDirection="column"
							justifyContent="start"
							width="100%"
							flexGrow="1"
						>
							<Component {...pageProps} />
						</Box>
						<Footer />
					</Box>
				</SnackbarProvider>
			</ThemeProvider>
		</AuthContext.Provider>
	);
}

export default MyApp;
