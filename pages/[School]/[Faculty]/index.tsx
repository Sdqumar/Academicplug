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
	//const isAdmin = uid == 'x1Fnwo5WimP9MwIjx4EWeQlyXpE3';
	return (
		data && (
			<Box mt="1rem" pl="1rem">
				<Button mt="1rem" onClick={onClick} d={uid ? 'block' : 'none'}>
					Add Department
				</Button>
				<Box
					d="none"
					boxShadow="base"
					rounded="md"
					ref={boxRef}
					pos="fixed"
					left="1px"
					top="6rem"
					bg="#fff"
					width="100%"
					zIndex={1}
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
				<Heading size="lg" fontSize="47px" m="auto">
					<Link href={schoolUrl}>{school}</Link> - {faculty}
				</Heading>
				<CoursesGrid list={data?.department} url={url} />
			</Box>
		)
	);
};

export default School;
