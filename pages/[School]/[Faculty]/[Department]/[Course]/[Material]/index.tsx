import firebase from 'config/firebase-config';
import {
	Container,
	Heading,
	Flex,
	useToast,
	Box,
	Text,
	Icon,
} from '@chakra-ui/react';
import DeleteButton from 'components/DeleteButton';
import { useRouter } from 'next/router';
import PDFViewer from 'components/PDFViewer';
import Link from 'next/link';
import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '/components/AuthContext';
import { IoStarOutline } from 'react-icons/io5';
import { IoStarSharp } from 'react-icons/io5';
import { Tooltip } from '@chakra-ui/react';
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
			.doc(school.replace(/\s/g, '-'))
			.collection('courses')
			.doc(course.replace(/\s/g, '-'))
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

	let user: { uid: String } = useContext(AuthContext);
	user = user?.uid;

	const [star, setStar] = useState(data.star);
	const isStared = star.includes(user);

	const updateStar = () => {
		firestore
			.collection('schools')
			.doc(school.replace(/\s/g, '-'))
			.collection('courses')
			.doc(course.replace(/\s/g, '-'))
			.get()
			.then((doc) => {
				if (doc.exists) {
					console.log('Document data:', doc.data().star.length);
					setStar(doc.data().star);
				} else {
					// doc.data() will be undefined in this case
				}
			})
			.catch((error) => {
				console.log('Error getting document:', error);
			});
	};
	const handleStar = () => {
		if (isStared && user) {
			firestore
				.collection('schools')
				.doc(school.replace(/\s/g, '-'))
				.collection('courses')
				.doc(course.replace(/\s/g, '-'))
				.update({
					star: firebase.firestore.FieldValue.arrayRemove(user),
				})
				.then((docRef) => {
					updateStar();
				})
				.catch((error) => console.log(error));
		}
		if (!isStared && user) {
			firestore
				.collection('schools')
				.doc(school.replace(/\s/g, '-'))
				.collection('courses')
				.doc(course.replace(/\s/g, '-'))
				.update({
					star: firebase.firestore.FieldValue.arrayUnion(user),
				})
				.then((docRef) => {
					updateStar();
				})
				.catch((error) => console.log(error));
		}
		if (!user) {
			router.push('/LoginForm');
		}
	};
	return (
		<Box>
			<Box mt="1rem">
				<Box ml="1rem" d={uid ? 'block' : 'none'}>
					<DeleteButton deleteFunction={handleDelete} name="Material" />
				</Box>
				<Heading ml="1rem" size="lg" fontSize="4vh" mt="1rem">
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
			<Flex>
				<Tooltip
					label="You must signed in to star a material"
					isDisabled={user}
					hasArrow
					arrowSize={15}
				>
					<Flex
						border="1px solid lightgray"
						m="1rem"
						w="fit-content"
						borderRadius="10px"
						cursor="pointer"
						fontSize="1.1rem"
						fontWeight="600"
						onClick={handleStar}
						align="center"
						p="3px"
					>
						<Flex align="center" p="0 3px">
							<Icon
								as={isStared ? IoStarSharp : IoStarOutline}
								position="relative"
								w="1.5rem"
								mr="3px"
							/>

							<Text borderRight="1px solid lightgray" pr="5px">
								{isStared ? 'Unstar' : 'Star'}
							</Text>
						</Flex>

						<Text pr="8px" _hover={{ color: 'primary' }}>
							{star.length}
						</Text>
					</Flex>
				</Tooltip>
			</Flex>
			<PDFViewer data={pdfurl} />
		</Box>
	);
};

export default School;
