import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import firebase from '../config/firebase-config';
import AuthContext from '../components/AuthContext';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
	header: {
		backgroundColor: theme.palette.secondary.main,
		maxWidth: '100%',
		height: '5.5rem',
		padding: '1rem',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('md')]: {
			padding: '7px',
		},
	},

	academicplug: {
		cursor: 'pointer',
		width: 'fit-content',
		display: 'flex',
		'& svg': {
			marginRight: ' 5px',
			fontSize: '40px',
		},
		'& h4': {
			fontWeight: 700,
			[theme.breakpoints.down('xs')]: {
				fontSize: '24px',
			},
		},
		'& h6': {
			letterSpacing: '10px',
			fontWeight: 700,
			marginTop: '-11px',
		},
	},

	logReg: {
		width: 'fit-content',
		display: 'flex',
		marginRight: '10px',
	},
	welcome: {
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '9rem',
		marginRight: '1rem',

		'& span': {
			fontWeight: 500,
		},
	},
}));

const Header = () => {
	const [currentUser, setCurrentUser] = useContext(AuthContext);

	const { enqueueSnackbar } = useSnackbar();

	const handleSignOut = async () => {
		const { getAuth, signOut } = await import('firebase/auth');
		const auth = getAuth(firebase);

		signOut(auth)
			.then(() => {
				Cookies.set('user', null);
				setCurrentUser(null);
				enqueueSnackbar('Sign Out Sucessful', {
					variant: 'success',
					autoHideDuration: 1000,
				});
			})
			.catch((error) => {});
	};

	const classes = useStyles();
	return (
		<Grid component="header" className={classes.header}>
			<NextLink href="/">
				<Box className={classes.academicplug}>
					<Box>
						<SchoolIcon />
					</Box>
					<Box>
						<Typography variant="h4">ACADEMIC</Typography>
						<Typography variant="h6">PLUG</Typography>
					</Box>
				</Box>
			</NextLink>

			<Box>
				{currentUser === null || undefined ? (
					<Box className={classes.logReg}>
						<Button>
							<NextLink href="/Signin">Login</NextLink>
						</Button>

						<Button variant="outlined">
							<NextLink href="/Signup">Sign Up</NextLink>
						</Button>
					</Box>
				) : (
					<Box display="flex">
						<Box
							display={{ xs: 'none', sm: 'flex' }}
							className={classes.welcome}
						>
							<Typography>Welcome</Typography>
							<Typography component="span">
								{currentUser?.displayName}
							</Typography>
						</Box>
						<Button variant="outlined" onClick={handleSignOut}>
							Sign Out
						</Button>
					</Box>
				)}
			</Box>
		</Grid>
	);
};

export default Header;
