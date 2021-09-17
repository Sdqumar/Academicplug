import { Box, Typography, makeStyles, Link } from '@material-ui/core';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
	grid: {
		display: 'flex',
		flexWrap: 'wrap',

		'& h5': {
			border: '2px solid',
			textAlign: 'center',
			padding: '0.5rem',
			fontWeight: 600,
		},
	},
}));

type CourseGridProps = {
	list: [];
	url: string;
	flexDir?: 'row' | 'column';
};
const CoursesGrid = ({ list, url, flexDir }: CourseGridProps) => {
	const classes = useStyles();

	return (
		<Box
			mt="1rem"
			flexDirection={flexDir ? flexDir : 'column'}
			maxWidth="100%"
			height="fit-content"
			justifyContent={{ base: 'center', md: 'flex-start' }}
			className={classes.grid}
		>
			{list?.map((item:string) => {
				return (
					<NextLink
						key={item}
						href={`${url}/${item.replace(/\s/g, '-')}`}
						passHref
					>
						<Link>
							{' '}
							<Box
								m="0 5px"
								bgcolor="rgb(251 174 23)"
								padding="1.2rem"
								minWidth="10rem"
								maxWidth="24rem"
								mb="0.8rem"
							>
								<Typography variant="h5">{item}</Typography>
							</Box>
						</Link>
					</NextLink>
				);
			})}
		</Box>
	);
};

export default CoursesGrid;
