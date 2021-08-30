import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';
export interface SchoolGridListProps {
	schools: [
		{
			name: string;
			slug: string;
			logourl: string;
		}
	];
}

const SchoolGridList: React.FC<SchoolGridListProps> = ({ schools }) => {
	return (
		<Box maxW="60rem" m="auto" mt="2rem">
			<Flex
				maxW="60rem"
				wrap="wrap"
				justify={{ md: 'space-evenly', base: 'space-evenly' }}
			>
				{schools.map((school) => {
					return (
						<Box
							w={{ base: '10rem', md: '11.5rem' }}
							boxShadow="base"
							m="0 10px"
							rounded="md"
							bg="gray.20"
							cursor="pointer"
							transition="all 0.4s"
							_hover={{
								boxShadow: 'xl',
							}}
							h="14rem"
							mb="2rem"
							key={school?.slug}
						>
							<LinkBox key={school?.name}>
								<Image
									src={school?.logourl}
									onError={() => console.log('error')}
									w="100%"
								/>
								<Heading size="sm" align="center">
									<Link
										href={{
											pathname: '/' + school?.slug,
											query: { school: school?.name },
										}}
										passHref
									>
										<LinkOverlay>{school?.name}</LinkOverlay>
									</Link>
								</Heading>
							</LinkBox>
						</Box>
					);
				})}
			</Flex>
		</Box>
	);
};

export default SchoolGridList;
