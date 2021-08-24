import { Container, Flex, Image, Box, Heading } from '@chakra-ui/react';

export interface BannerHomeProps {}

const BannerHome: React.FC<BannerHomeProps> = () => {
	return (
		<Flex w="100%" h="20rem" justify="center">
			<Box position="relative" w="85%">
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
					<Heading size="2xl" fontSize={{ base: '2.8rem', md: '3rem' }}>
						Courses for Nigerian Students
					</Heading>
				</Box>
			</Box>
		</Flex>
	);
};

export default BannerHome;
