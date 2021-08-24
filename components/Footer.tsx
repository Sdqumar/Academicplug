import { Flex, Text } from '@chakra-ui/react';

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
	return (
		<Flex w="100%" bg="#000" color="#fbae17" justify="space-around" p="0.7rem">
			<Text>ACADEMIC PLUG</Text>
			<Text>2021</Text>
		</Flex>
	);
};

export default Footer;
