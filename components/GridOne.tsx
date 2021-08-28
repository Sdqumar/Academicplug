import { Box, Flex, Button, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface GridProps {
	data: [];
}

const GridOne: React.FC<GridProps> = ({ data }) => {
	const router = useRouter();
	const school = router.query.School;

	return (
		<>
			<Flex w="100%" justify="center">
				<Flex
					mt="1rem"
					maxW="fit-content"
					wrap="wrap"
					flexDir="column"
					justify={{ md: 'flex-start', base: 'center' }}
				>
					{data.map(({ name }) => {
						return (
							<Link href={`/${school}/${name}`} key={name}>
								<Flex
									m="0 1.3%"
									bg="rgb(251 174 23)"
									padding="auto"
									flexDirection="column"
									mb="1rem"
									key={name}
									cursor="pointer"
								>
									<Heading m="auto" size="lg" align="center" border="3px solid">
										{name}
									</Heading>
								</Flex>
							</Link>
						);
					})}
				</Flex>
			</Flex>
		</>
	);
};

export default GridOne;
