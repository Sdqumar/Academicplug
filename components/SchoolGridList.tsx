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
					const imgSrc = `logo/${school.slug}.png`;

					return (
						<Box
							w={{ base: '9rem', md: '11.5rem' }}
							boxShadow="base"
							m="0 10px"
							rounded="md"
							bg="gray.20"
							cursor="pointer"
							transition="all 0.4s"
							_hover={{
								boxShadow: 'xl',
							}}
							h={{ base: '12rem', md: '14rem' }}
							mb="2rem"
							key={school?.slug}
						>
							<LinkBox key={school?.name}>
								<Image
									src={imgSrc}
									fallbackSrc={school.logourl}
									w="100%"
									h={{ base: '8rem', md: '11rem' }}
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
