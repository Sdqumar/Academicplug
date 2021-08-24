import { Flex, Heading, Box, Text, Icon, Button } from '@chakra-ui/react';
import firebase from '../config/firebase-config';
import AuthContext from '../components/AuthContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Link from 'next/link';
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
		<Flex background="#fbae17" w="100%" justify="space-between" align="center">
			<Link href="/">
				<Box ml="10px" alignItems="center" pb="15px" cursor="pointer">
					<Icon
						as={IoSchoolSharp}
						position="relative"
						left="-40px"
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
				</Box>
			</Link>

			<Flex className="log-reg" m="0 10px">
				{user === null || undefined ? (
					<Flex
						w="7rem"
						justify="flex-end"
						align-items="center"
						fontWeight="600"
					>
						<Link href="/LoginForm">Login</Link>
						<Link href="/RegistrationForm">Register</Link>
					</Flex>
				) : (
					<Flex align="center" w="13.5rem" justify="flex-end">
						<Flex d={{ sm: 'flex', base: 'none' }}>
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
