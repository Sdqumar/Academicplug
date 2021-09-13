import Tooltip from '@material-ui/core/Tooltip';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Box, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import firebase from 'config/firebase-config';

const Star = ({ data, user, school, course }) => {
	const [star, setStar] = useState(data?.star || []);

	const [isStared, setIsStared] = useState<null | boolean>(null);

	useEffect(() => {
		if (user != undefined) {
			if (star.length !== 0) {
				setIsStared(star?.includes(user));
			}
		}
	}, [star, user]);

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

	return (
		<Tooltip title={user ? '' : 'You must signed in to star a material'} arrow>
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
	);
};

export default Star;
