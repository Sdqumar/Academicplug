import { Box, Typography, makeStyles, Link } from "@material-ui/core";
import NextLink from "next/link";

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    flexWrap: "wrap",

    "& h6": {
      textAlign: "center",
      padding: "0.5rem",
      fontWeight: 600,
      textTransform: "capitalize",
      fontSize: "100%",
    },
  },
}));

type courses = {
  School: string;
  Faculty: string;
  Department: string;
  Course: string;
  Code: string;
};
type RecentCoursesProps = {
  list: courses[];
};
const RecentCourses = ({ list }: RecentCoursesProps) => {
  const classes = useStyles();

  return (
    <Box marginY={5}  maxWidth="55rem">
    <Typography variant="h5" style={{marginLeft:'10px',fontWeight:600}}>
      Recent Courses
    </Typography>
    <Box
      mt="1rem"
      flexDirection="row"
      height="fit-content"
      marginX='auto'
      justifyContent='start'
      className={classes.grid}
    >
      {list.map((item) => {
        const { School, Faculty, Department, Course, Code } = item;
        const schoolUrl = `/${School.replace(/\s/g, "-")}`;
        const facultyUrl = `/${Faculty.replace(/\s/g, "-")}`;
        const departmentUrl = `/${Department.replace(/\s/g, "-")}`;

        const url = schoolUrl + facultyUrl + departmentUrl;
        return (
          <NextLink
            key={Code}
            href={`${url}/${Course.trim().replace(/\s/g, "-")}`}
            passHref
          >
            <Link>
              <Box
                m="0 5px"
                bgcolor="rgb(251 174 23)"
                padding="1rem"
                width="10rem"
                height="4rem"
                mb="0.8rem"
              >
                <Box
                  border="2px solid"
                  width="100%"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="h6">
                    {item.Course.toLowerCase().trim()}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </NextLink>
        );
      })}
    </Box>
    </Box>

  );
};

export default RecentCourses;
