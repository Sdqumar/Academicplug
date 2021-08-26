import firebase from 'config/firebase-config';
import { Container, Heading, Flex, useToast, Box } from '@chakra-ui/react';
import DeleteButton from 'components/DeleteButton';
import { useRouter } from 'next/router';
import PDFViewer from 'components/PDFViewer';
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
				Material: 'Human Biology',
			},
		},
	];

	return { paths, fallback: 'blocking' };
}

export async function getStaticProps(context) {
	const school = context.params.School;
	const course = context.params.Course;

	const schoolRef = await firestore
		.collection('schools')
		.doc(school)
		.collection('courses')
		.where('Course', '==', course.replace(/-/g, ' '))
		.get();

	const adminRef = await firestore
		.collection('schools')
		.doc(school)
		.collection('admin')
		.doc('admin')
		.get();

	const admins = adminRef.data()?.admins;

	const [data] = schoolRef.docs.map((item) => item.data());
	return {
		props: {
			admins,
			data,
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
	const course = router.query.Course.toString().replace(/-/g, ' ');
	const material = router.query.Material.toString().replace(/-/g, ' ');

	const schoolUrl = `/${school.replace(/\s/g, '-')}`;
	const facultyUrl = `/${faculty.replace(/\s/g, '-')}`;
	const departmentUrl = `/${department.replace(/\s/g, '-')}`;
	const courseUrl = `/${course.replace(/\s/g, '-')}`;

	const [{ pdfurl }] = data.Materials.filter((item) => item.Name == material);
	const toast = useToast();
	const displayToast = () => {
		toast({
			title: 'Material Deleted',
			position: 'top',
			status: 'success',
			duration: 2000,
			isClosable: true,
		});
	};

	const handleDelete = async () => {
		const storage = firebase.storage();
		const fileStorageRef = `${school}/${faculty}/${department}/${course}/${material}`;

		firestore
			.collection('schools')
			.doc(school)
			.collection('courses')
			.doc(course)
			.update({
				Materials: firebase.firestore.FieldValue.arrayRemove({
					Name: material,
					pdfurl,
				}),
			})
			.then(() => {
				storage
					.ref()
					.child(fileStorageRef)
					.delete()
					.then(() => {
						console.log('Document successfully deleted!');
						displayToast();

						setTimeout(() => router.back(), 2500);
					});
			})
			.catch((error) => {
				console.error('Error removing document: ', error);
			});
	};

	return (
		<Container maxW="95%" overflow="hidden">
			<Box mt="1rem">
				<Box d={isAdmin ? 'block' : 'none'}>
					<DeleteButton deleteFunction={handleDelete} name="Material" />
				</Box>
				<Heading size="lg" fontSize="47px" w="95%" m="auto" mt="1rem">
					<Link href={schoolUrl}>{school}</Link> -{' '}
					<Link href={schoolUrl + facultyUrl}>{faculty}</Link> -{' '}
					<Link href={schoolUrl + facultyUrl + departmentUrl}>
						{department}
					</Link>{' '}
					-{' '}
					<Link href={schoolUrl + facultyUrl + departmentUrl + courseUrl}>
						{course}
					</Link>
					- {material}
				</Heading>
			</Box>
			<PDFViewer data={pdfurl} />
		</Container>
	);
};

export default School;
