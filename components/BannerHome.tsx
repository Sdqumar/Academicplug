import { Container, Flex, Image, Box, Heading } from '@chakra-ui/react';

export interface BannerHomeProps {}

const BannerHome: React.FC<BannerHomeProps> = () => {
	return (
		<Flex w="100%" h="20rem" justify="center" mt={{ base: 0, md: '1rem' }}>
			<Box position="relative" w="100vw">
				<Image
					w="100%"
					h="100%"
					objectFit="cover"
					src="banner.jpg"
					alt="Home-Banner"
					filter="brightness(40%) grayscale(100%)"
				/>
				<Box
					position="absolute"
					top="6rem"
					color="rgb(251 174 23)"
					width={{ base: '100%', md: '27rem' }}
				>
					<Heading
						size="2xl"
						ml="1rem"
						fontSize={{ base: '2.8rem', md: '3rem' }}
					>
						Courses for Nigerian Students
					</Heading>
				</Box>
			</Box>
		</Flex>
	);
};

export default BannerHome;
