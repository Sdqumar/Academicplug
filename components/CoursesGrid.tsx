import { Box, Flex, Button, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';

const CoursesGrid = ({ list, url, flexDir }) => {
	return (
		<>
			<Flex>
				<Flex
					mt="1rem"
					flexDir={flexDir ? flexDir : 'column'}
					wrap="wrap"
					justify="start"
					w="fit-content"
				>
					{list?.map((item) => {
						return (
							<Link href={`${url}/${item.replace(/\s/g, '-')}`} key={item}>
								<Flex
									m="0 5px"
									bg="rgb(251 174 23)"
									padding="0.8rem"
									flexDirection="column"
									mb="1rem"
									key={item}
									cursor="pointer"
								>
									<Heading
										m="auto"
										size="lg"
										align="center"
										w="80%"
										border="3px solid"
									>
										{item}
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

export default CoursesGrid;
