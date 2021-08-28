import { Flex, Text } from '@chakra-ui/react';

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
	return (
		<Flex w="100%" bg="#000" color="#fbae17" align="center" p="0.7rem">
			<Text> {'ACADEMIC PLUG 2021\u00A9 '}</Text>
		</Flex>
	);
};

export default Footer;
