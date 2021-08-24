import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';

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
				justify={{ md: 'space-evenly', base: 'center' }}
			>
				{schools.map((school) => {
					return (
						<Link
							href={{
								pathname: `/${school.slug}`,
								query: { school: school?.name },
							}}
							key={school?.slug}
						>
							<Box
								w="12rem"
								key={school?.name}
								boxShadow="base"
								m="0 10px"
								rounded="md"
								bg="gray.20"
								cursor="pointer"
								mb="2rem"
								transition="all 0.4s"
								_hover={{
									boxShadow: 'xl',
								}}
							>
								<Image
									src={school?.logourl}
									onError={() => console.log('error')}
									w="100%"
									h="10rem"
								/>

								<Heading size="sm" align="center">
									{school?.name}
								</Heading>
							</Box>
						</Link>
					);
				})}
			</Flex>
		</Box>
	);
};

export default SchoolGridList;
