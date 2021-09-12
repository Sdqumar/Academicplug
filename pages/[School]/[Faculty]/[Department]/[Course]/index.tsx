import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useState } from 'react';
import { useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Tooltip from '@material-ui/core/Tooltip';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import firebase from 'config/firebase-config';
import AuthContext from '/components/AuthContext';

const DeleteButton = dynamic(() => import('components/DeleteButton'));
const PDFViewer = dynamic(() => import('components/PDFViewer'));

export async function getStaticPaths() {
	const paths = [
		{
			params: {
				School: 'Futminna',
				Faculty: 'Education',
				Department: 'Health-Education',
				Course: 'HED-211',
			},
		},
	];

	return { paths, fallback: 'blocking' };
}
export async function getStaticProps(context) {
	const school = context.params.School;
	const department = context.params.Department;
	const course = context.params.Course;

	const { doc, getDoc, getFirestore } = await import('firebase/firestore');
	const firestore = getFirestore(firebase);

	const docRef = doc(firestore, 'schools', school, 'courses', course);
	const dataRef = await getDoc(docRef);
	const data = dataRef.data();

	const adminRef = await getDoc(
		doc(firestore, 'schools', school, 'admin', 'admin')
	);

	let admins = adminRef?.data()?.admins;

	return {
		props: {
			data,
			admins,
		},
	};
}

const School = ({ data, admins }) => {
	let userId: { uid: String } = useContext(AuthContext);
	const user = userId?.uid;

	const [star, setStar] = useState(data?.star || []);

	const [isStared, setIsStared] = useState(false);
	star.length > 1 && setIsStared(star?.includes(user));

	const updateStar = async () => {
		const { doc, getDoc, getFirestore } = await import('firebase/firestore');

		const firestore = getFirestore(firebase);

		const docRef = doc(
			firestore,
			'schools',
			school.replace(/\s/g, '-'),
			'courses',
			course.replace(/\s/g, '-')
		);
		const dataRef = await getDoc(docRef);

		const data = dataRef.data();

		setStar(data.star);
	};

	const handleStar = async () => {
		const { doc, updateDoc, getFirestore, arrayUnion, arrayRemove } =
			await import('firebase/firestore');

		const firestore = getFirestore(firebase);

		if (isStared && user) {
			if (star == 1) {
				setStar([]);
			} else {
				setStar(data.star - 1);
			}
			setIsStared(false);
			updateDoc(
				doc(
					firestore,
					'schools',
					school.replace(/\s/g, '-'),
					'courses',
					course.replace(/\s/g, '-')
				),
				{
					star: arrayRemove(user),
				}
			)
				.then(() => {
					updateStar();
				})
				.catch((error) => console.log(error));
		}
		if (!isStared && user) {
			setStar(data.star + 1);
			setIsStared(true);
			updateDoc(
				doc(
					firestore,
					'schools',
					school.replace(/\s/g, '-'),
					'courses',
					course.replace(/\s/g, '-')
				),
				{
					star: arrayUnion(user),
				}
			)
				.then(() => {
					updateStar();
				})
				.catch((error) => console.log(error));
		}
	};
	// const auth = firebase.auth();

	// const uid = auth?.currentUser?.uid;

	// let isAdmin = admins?.some((item) => item == uid);

	const router = useRouter();

	const school = router.query.School.toString().replace(/-/g, ' ');
	const faculty = router.query.Faculty.toString().replace(/-/g, ' ');
	const department = router.query.Department.toString().replace(/-/g, ' ');
	const course = router.query.Course.toString().replace(/-/g, ' ');

	const schoolUrl = `/${school.replace(/\s/g, '-')}`;
	const facultyUrl = `/${faculty.replace(/\s/g, '-')}`;
	const departmentUrl = `/${department.replace(/\s/g, '-')}`;
	const courseUrl = `/${course.replace(/\s/g, '-')}`;

	const { enqueueSnackbar } = useSnackbar();

	const handleDelete = async () => {
		const { doc, deleteDoc, getFirestore } = await import('firebase/firestore');
		const firestore = getFirestore(firebase);
		const docRef = await doc(
			firestore,
			'schools',
			school.replace(/\s/g, '-'),
			'courses',
			course.replace(/\s/g, '-')
		);

		deleteDoc(docRef)
			.then(() => {
				setTimeout(() => router.back(), 2500);
				enqueueSnackbar('Material Removed Sucessful', {
					variant: 'success',
					autoHideDuration: 1000,
				});
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	return (
		<Box>
			<Box mt="1rem">
				<Box mr="1rem" display="flex" justifyContent="end">
					<DeleteButton name="Material" deleteFunction={handleDelete} />
				</Box>
				<Typography className="heading">
					<NextLink href={schoolUrl}>{school}</NextLink> -{' '}
					<NextLink href={schoolUrl + facultyUrl}>{faculty}</NextLink> -{' '}
					<NextLink href={schoolUrl + facultyUrl + departmentUrl}>
						{department}
					</NextLink>
					-{course}
				</Typography>
			</Box>
			<Box>
				<Tooltip
					title={user ? '' : 'You must signed in to star a material'}
					arrow
				>
					<Box
						border="1px solid lightgray"
						m="1rem"
						width="fit-content"
						borderRadius="10px"
						fontSize="1.1rem"
						fontWeight="600"
						onClick={handleStar}
						alignItems="center"
						p="4px"
						display="flex"
						className="pointer"
					>
						<Box display="flex" alignItems="center" p="0 3px">
							<Box mr="5px">{isStared ? <StarIcon /> : <StarBorderIcon />}</Box>

							<Box borderRight="1px solid lightgray" pr="7px">
								<Typography>{isStared ? 'Unstar' : 'Star'}</Typography>
							</Box>
						</Box>
						<Box p="0 5px">
							<Typography>{star.length}</Typography>
						</Box>
					</Box>
				</Tooltip>
			</Box>
			<PDFViewer data={data?.pdfRef} />
		</Box>
	);
};

export default School;
