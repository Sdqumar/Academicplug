import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import firebase from 'config/firebase-config';
import { Box, Typography, Button, makeStyles } from '@material-ui/core';
import { useRef, useContext } from 'react';
import AuthContext from '/components/AuthContext';

import dynamic from 'next/dynamic';

const AddFaculty = dynamic(() => import('components/AddFaculty'));
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
	const { getDocs, doc, getDoc, getFirestore, collection } = await import(
		'firebase/firestore'
	);
	const firestore = getFirestore(firebase);

	const school = context.params.School;
	const q = await getDocs(collection(firestore, 'schools', school, 'faculty'));
	const data = q.docs.map((doc) => doc.data());

	const adminRef = await getDoc(doc(firestore, 'SuperUser', 'Admin'));

	let admin = adminRef?.data()?.SuperAdmin;

	return {
		props: {
			data,
			admin,
		},
		revalidate: 10000,
	};
}

const useStyles = makeStyles((theme) => ({
	department: {
		'& .MuiButton-contained': {
			color: 'red',
		},
	},
}));

const School = ({ data, admin }) => {
	const [currentUser] = useContext(AuthContext);
	const router = useRouter();
	const school = router.query.school;
	const School = router.query.School;
	const classes = useStyles();

	const list = data.map((item) => item?.name);

	const boxRef = useRef(null);

	let isAdmin = admin === currentUser?.uid;

	const onClick = () => {
		boxRef.current.style.display = 'block';
	};
	const closeBox = () => {
		boxRef.current.style.display = 'none';
	};
	return (
		<Box mt="1rem" pl="1rem">
			<Box display={isAdmin ? 'block' : 'none'}>
				<Button variant="outlined" onClick={onClick}>
					Add Faculty
				</Button>
				<Box
					display="none"
					ref={boxRef}
					position="fixed"
					left="1px"
					top="6rem"
					bgcolor="#fff"
					width="100%"
					zIndex={1}
					className={classes.department}
				>
					<Box
						justifyContent="space-between"
						mt="1rem"
						ml={{ xs: '10px', md: '2rem' }}
					>
						<Typography className="heading">Add Faculty</Typography>
						<Button variant="contained" onClick={closeBox}>
							Close
						</Button>
					</Box>
					<AddFaculty school={School} />
				</Box>
			</Box>
			<Typography variant="h3" className="heading">
				{school ? school : School}
			</Typography>
			<CoursesGrid list={list} url={`/${School}`} />
		</Box>
	);
};

export default School;
