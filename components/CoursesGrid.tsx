import { Flex, Button, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { LinkOverlay, LinkBox } from '@chakra-ui/react';

const CoursesGrid = ({ list, url, flexDir }) => {
	return (
		<Flex
			mt="1rem"
			flexDir={flexDir ? flexDir : 'column'}
			wrap="wrap"
			maxW="27rem"
			h="fit-content"
			justify={{ base: 'center', md: 'flex-start' }}
		>
			{list?.map((item) => {
				return (
					<LinkBox key={item}>
						<Flex
							m="0 5px"
							bg="rgb(251 174 23)"
							padding="1.2rem"
							cursor="pointer"
							minW="10rem"
							mb="0.8rem"
						>
							<Heading
								m="auto"
								size="lg"
								align="center"
								w="100%"
								border="3px solid"
							>
								<Link href={`${url}/${item.replace(/\s/g, '-')}`} passHref>
									<LinkOverlay>{item}</LinkOverlay>
								</Link>
							</Heading>
						</Flex>
					</LinkBox>
				);
			})}
		</Flex>
	);
};

export default CoursesGrid;
