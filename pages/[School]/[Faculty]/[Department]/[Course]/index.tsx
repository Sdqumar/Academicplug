import firebase from 'config/firebase-config';
import {
	Container,
	Heading,
	useToast,
	Button,
	Box,
	Flex,
} from '@chakra-ui/react';
import CoursesGrid from 'components/CoursesGrid';
import DeleteButton from 'components/DeleteButton';
import { useRouter } from 'next/router';
import AddMaterial from 'components/AddMaterial';
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

	const schoolRef = await firestore
		.collection('schools')
		.doc(school)
		.collection('courses')
		.where('Course', '==', course.replace(/-/g, ' '))
		.where('Department', '==', department.replace(/-/g, ' '))
		.get();

	const adminRef = await firestore
		.collection('schools')
		.doc(school)
		.collection('admin')
		.doc('admin')
		.get();
	console.log(school, course);

	const admins = adminRef.data().admins;

	const [data] = schoolRef.docs.map((item) => item.data());

	return {
		props: {
			data,
			admins,
		},
		revalidate: 10,
	};
}

const School = ({ data: result, admins }) => {
	const auth = firebase.auth();

	const uid = auth?.currentUser?.uid;

	let isAdmin = admins?.some((item) => item == uid);

	const router = useRouter();

	const list = result?.Materials?.map((item) => item.Name);
	const school = router.query.School.toString().replace(/-/g, ' ');
	const faculty = router.query.Faculty.toString().replace(/-/g, ' ');
	const department = router.query.Department.toString().replace(/-/g, ' ');
	const course = router.query.Course.toString().replace(/-/g, ' ');

	const schoolUrl = `/${school.replace(/\s/g, '-')}`;
	const facultyUrl = `/${faculty.replace(/\s/g, '-')}`;
	const departmentUrl = `/${department.replace(/\s/g, '-')}`;
	const courseUrl = `/${course.replace(/\s/g, '-')}`;

	const url = schoolUrl + facultyUrl + departmentUrl + courseUrl;

	const toast = useToast();
	const displayToast = () => {
		toast({
			title: 'Course Deleted',
			position: 'top',
			status: 'success',
			duration: 2000,
			isClosable: true,
		});
	};
	const boxRef = useRef(null);

	const onClick = () => {
		boxRef.current.style.display = 'block';
	};
	const closeBox = () => {
		boxRef.current.style.display = 'none';
	};
	const handleDelete = async () => {
		firestore
			.collection('schools')
			.doc(school.replace(/\s/g, '-'))
			.collection('courses')
			.doc(course.replace(/\s/g, '-'))
			.delete()
			.then(() => {
				displayToast();

				setTimeout(() => router.back(), 2500);
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	return (
		<Box mt="1rem" pl="1rem">
			<Flex justify="space-evenly" mt="1rem" d={uid ? 'flex' : 'none'}>
				<Button onClick={onClick}>Add Material</Button>
				<DeleteButton deleteFunction={handleDelete} name="Course" />
			</Flex>
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
				<Flex justify="space-between" m="2rem 1rem" mb="0px">
					<Heading size="lg" fontSize="30px">
						Add Material
					</Heading>
					<Button color="red" float="right" onClick={closeBox}>
						Close
					</Button>
				</Flex>
				<AddMaterial />
			</Box>
			<Heading size="lg" fontSize="47px" w="95%">
				<Link href={schoolUrl}>{school}</Link> -{' '}
				<Link href={schoolUrl + facultyUrl}>{faculty}</Link> -{' '}
				<Link href={schoolUrl + facultyUrl + departmentUrl}>{department}</Link>{' '}
				- {course}
			</Heading>

			<CoursesGrid list={list} url={url} />
		</Box>
	);
};

export default School;
