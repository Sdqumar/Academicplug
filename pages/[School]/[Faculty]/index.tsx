import firebase from '../../../config/firebase-config';
import { Container, Heading, Flex, Button, Box } from '@chakra-ui/react';
import CoursesGrid from '../../../components/CoursesGrid';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRef } from 'react';
import AddDepartment from 'components/AddDepartment';

const firestore = firebase.firestore();

export async function getStaticPaths() {
	const paths = [
		{
			params: {
				School: 'Futminna',
				Faculty: 'Education',
			},
		},
	];

	return { paths, fallback: 'blocking' };
}

export async function getStaticProps(context) {
	const school = context.params.School;
	const faculty = context.params.Faculty;

	const dataRef = await firestore
		.collection('schools')
		.doc(school)
		.collection('faculty')
		.doc(faculty)
		.get();

	const data = dataRef.data();

	return {
		props: {
			data,
		},
		revalidate: 10,
	};
}

const School = ({ data }) => {
	const router = useRouter();

	// if (!data) {
	// 	const router = useRouter();
	// 	router.push('/404');
	// }
	const school = router.query.School.toString().replace(/-/g, ' ');

	const faculty = router.query.Faculty.toString().replace(/-/g, ' ');

	const schoolUrl = `/${school.replace(/\s/g, '-')}`;
	const facultyUrl = `/${faculty.replace(/\s/g, '-')}`;

	const url = schoolUrl + facultyUrl;
	const boxRef = useRef(null);

	const onClick = () => {
		boxRef.current.style.display = 'block';
	};
	const closeBox = () => {
		boxRef.current.style.display = 'none';
	};

	const auth = firebase.auth();

	const uid = auth?.currentUser?.uid;
	const isAdmin = uid == process.env.NEXT_PUBLIC_SUPER_ADMIN;
	return (
		data && (
			<>
				<Button mt="1rem" onClick={onClick} d={isAdmin ? 'block' : 'none'}>
					Add Department
				</Button>
				<Box
					d="none"
					left="2rem"
					boxShadow="base"
					rounded="md"
					ref={boxRef}
					pos="absolute"
					bg="#fff"
					width="95vw"
					top="6rem"
				>
					<Flex justify="space-between" mt="1rem">
						<Heading size="lg" fontSize="30px" m="1rem">
							Add Department
						</Heading>
						<Button color="red" float="right" m="1rem" onClick={closeBox}>
							Close
						</Button>
					</Flex>
					<AddDepartment />
				</Box>
				<Heading size="lg" fontSize="50px">
					<Link href={schoolUrl}>{school}</Link> - {faculty}
				</Heading>
				<CoursesGrid list={data?.department} url={url} />
			</>
		)
	);
};

export default School;
