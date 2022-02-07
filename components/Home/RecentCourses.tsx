import { Box, Typography, makeStyles, Link } from "@material-ui/core";
import NextLink from "next/link";

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    flexWrap: "wrap",

    "& h5": {
      border: "2px solid",
      textAlign: "center",
      padding: "0.5rem",
      fontWeight: 600,
    },
  },
}));

type courses = {
  School:string;
  Faculty:string;
  Department:string;
  Course:string;
  Code:string;
}
type RecentCoursesProps = {
  list: courses[];
  
};
const RecentCourses = ({ list,  }: RecentCoursesProps) => {
  const classes = useStyles();

  return (
    <Box
      mt="1rem"
      flexDirection="row"
      height="fit-content"
      justifyContent={{ base: "center", md: "flex-start" }}
      className={classes.grid}
    >
      {list.map((item) => {
        const {School,Faculty,Department,Course,Code} =item
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
              {" "}
              <Box
                m="0 5px"
                bgcolor="rgb(251 174 23)"
                padding="1.2rem"
                width="10rem"
                height='fit-content'
                mb="0.8rem"
              >
                <Typography variant="h5">{item.Course.trim()}</Typography>
              </Box>
            </Link>
          </NextLink>
        );
      })}
    </Box>
  );
};

export default RecentCourses;
