import { Flex, Heading, Box, Text, Icon, Button } from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import AuthContext from '../components/AuthContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { IoSchoolSharp } from 'react-icons/io5';

const Hearder = () => {
	const user = useContext(AuthContext);
	const auth = firebase.auth();
	const router = useRouter();

	const handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				router.push('/');
			})
			.catch((error) => {});
	};

	return (
		<Flex background="primary" w="100%" justify="space-between" align="center">
			<Box
				alignItems="center"
				cursor="pointer"
				ml={{ md: '5rem', base: '3rem' }}
			>
				<NextLink href="/">
					<Icon
						as={IoSchoolSharp}
						position="relative"
						left="-47px"
						bottom="-35px"
						w="2rem"
						h="2rem"
					/>
					<Heading as="h3" size="lg">
						ACADEMIC
					</Heading>
					<Heading as="h6" size="sm" letterSpacing={10} mt="-7px">
						PLUG
					</Heading>
				</NextLink>
			</Box>

			<Flex
				className="log-reg"
				mr={{ md: '2rem', base: '1rem' }}
				w="fit-content"
				h="fit-content"
			>
				{user === null || undefined ? (
					<Flex
						w="7rem"
						justify="space-around"
						align-items="center"
						fontWeight="600"
						align="center"
					>
						<NextLink href="/LoginForm">Login</NextLink>
						<NextLink href="/RegistrationForm">Register</NextLink>
					</Flex>
				) : (
					<Flex align="center" justify="space-around">
						<Flex d={{ sm: 'flex', base: 'none' }} mr="1rem">
							<Text mr="5px">Welcome</Text>
							<Text fontWeight="600">{user?.displayName}</Text>
						</Flex>
						<Text
							_hover={{ color: 'gray.400' }}
							cursor="pointer"
							border="1.5px solid #000"
							fontWeight="600"
							borderRadius="8%"
							p="4px"
							onClick={handleSignOut}
						>
							Sign Out
						</Text>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default Hearder;
