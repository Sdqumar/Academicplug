import firebase from '../../../../config/firebase-config';
import { Container, Heading, Flex, Box, Button } from '@chakra-ui/react';
import CoursesGrid from '../../../../components/CoursesGrid';
import { useRouter } from 'next/router';
import AddCourse from '../../../../components/AddCourse';
import { useRef } from 'react';
import Link from 'next/link';

const firestore = firebase.firestore();

export async function getStaticPaths() {
	const paths = [
		{
			params: {
				School: 'Futminna',
				Faculty: 'Education',
				Department: 'Health-Education',
			},
		},
	];

	return { paths, fallback: 'blocking' };
}

export async function getStaticProps(context) {
	const school = context.params.School;
	const faculty = context.params.Faculty;
	const department = context.params.Department;

	const schoolRef = await firestore
		.collection('schools')
		.doc(school)
		.collection('courses')
		.where('School', '==', school)
		.where('Department', '==', department.replace(/-/g, ' '))
		.get();

	const adminRef = await firestore
		.collection('schools')
		.doc(school)
		.collection('admin')
		.doc('admin')
		.get();

	let admins = adminRef?.data()?.admins;

	let data = schoolRef.docs.map((item) => item.id.replace(/-/g, ' '));

	// if (data === [] && !admins) {
	// 	return {
	// 		notFound: true,
	// 	};
	// }
	return {
		props: {
			data,
			admins,
		},
		revalidate: 10,
	};
}

const School = ({ data, admins }) => {
	const auth = firebase.auth();

	const uid = auth?.currentUser?.uid;

	let isAdmin = admins?.some((item) => item == uid);

	const router = useRouter();

	const school = router.query.School.toString().replace(/-/g, ' ');

	const faculty = router.query.Faculty.toString().replace(/-/g, ' ');
	const department = router.query.Department.toString().replace(/-/g, ' ');

	const schoolUrl = `/${school.replace(/\s/g, '-')}`;
	const facultyUrl = `/${faculty.replace(/\s/g, '-')}`;
	const departmentUrl = `/${department.replace(/\s/g, '-')}`;

	const url = schoolUrl + facultyUrl + departmentUrl;

	const boxRef = useRef(null);

	const onClick = () => {
		boxRef.current.style.display = 'block';
	};
	const closeBox = () => {
		boxRef.current.style.display = 'none';
	};

	return (
		<Box mt="1rem" pl="1rem">
			<Button mt="1rem" onClick={onClick} d={isAdmin ? 'block' : 'none'}>
				Add Course
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
						Add Course
					</Heading>
					<Button color="red" float="right" m="1rem" onClick={closeBox}>
						Close
					</Button>
				</Flex>

				<AddCourse School={school} Faculty={faculty} Department={department} />
			</Box>

			<Heading size="lg" fontSize="47px" m="auto">
				<Link href={schoolUrl}>{school}</Link> -
				<Link href={schoolUrl + facultyUrl}>{faculty}</Link> - {department}
			</Heading>
			<CoursesGrid flexDir="row" list={data} url={url} />
		</Box>
	);
};

export default School;
