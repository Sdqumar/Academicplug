import { Box, Typography } from '@material-ui/core';
export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
	return (
		<Box
			maxWidth="100%"
			bgcolor="#000"
			color="secondary.main"
			justifyContent="space-around"
			alignItems="center"
			p="0.7rem"
		>
			<Typography> {'ACADEMIC PLUG 2021\u00A9 '}</Typography>
		</Box>
	);
};

export default Footer;
