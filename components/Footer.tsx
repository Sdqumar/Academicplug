import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
	return (
		<Flex
			w="100%"
			bg="#000"
			color="#fbae17"
			justify="space-around"
			align="center"
			p="0.7rem"
		>
			<Text> {'ACADEMIC PLUG 2021\u00A9 '}</Text>
			<Link href="/PageSuggestion">Suggestion Page</Link>
		</Flex>
	);
};

export default Footer;
