import { Flex, Heading, Box, Text, Icon, Button } from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import AuthContext from '../components/AuthContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Link from 'next/link';
import { IoSchoolSharp } from 'react-icons/io5';
import { LinkOverlay, LinkBox } from '@chakra-ui/react';

const Header = () => {
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
			<LinkBox>
				<Box mt="-20px" cursor="pointer" ml={{ md: '5rem', base: '3rem' }}>
					<Link href="/">
						<LinkOverlay>
							<Icon
								as={IoSchoolSharp}
								position="relative"
								left="-47px"
								bottom="-35px"
								w="2rem"
								h="2rem"
							/>
						</LinkOverlay>
					</Link>
					<Heading as="h3" size="lg">
						ACADEMIC
					</Heading>
					<Heading as="h6" size="sm" letterSpacing={10} mt="-7px">
						<Link href="/">
							<LinkOverlay>PLUG</LinkOverlay>
						</Link>
					</Heading>
				</Box>
			</LinkBox>

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
						<Link href="/LoginForm">Login</Link>
						<Link href="/RegistrationForm">Register</Link>
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

export default Header;
