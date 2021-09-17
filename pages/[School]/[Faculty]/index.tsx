import Head from "next/head";

import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useRef, useContext } from "react";
import firebase from "config/firebase-config";
import AuthContext from "components/AuthContext";

import dynamic from "next/dynamic";

const AddDepartment = dynamic(() => import("components/AddDepartment"));
const CoursesGrid = dynamic(() => import("components/CoursesGrid"));

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        School: "Futminna",
        Faculty: "Education",
      },
    },
  ];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const school = context.params.School;
  const faculty = context.params.Faculty;

  const { doc, getDoc, getFirestore } = await import("firebase/firestore");

  const firestore = getFirestore(firebase);

  const docRef = doc(firestore, "schools", school, "faculty", faculty);
  const dataRef = await getDoc(docRef);

  const data = dataRef.data();

  const adminRef = await getDoc(
    doc(firestore, "schools", school, "admin", "admin")
  );

  let admins = adminRef?.data()?.admins;

  return {
    props: {
      data,
      admins,
    },
    revalidate: 10,
  };
}

const useStyles = makeStyles((theme) => ({
  department: {
    "& .MuiButton-contained": {
      color: "red",
    },
  },
}));

const School = ({ data, admins }) => {
  const [currentUser] = useContext(AuthContext);

  let isAdmin = admins?.some((item) => item == currentUser?.uid);

  const router = useRouter();
  const classes = useStyles();
  // if (!data) {
  // const router = useRouter();
  // router.push('/404');
  // }
  const school = router.query.School.toString().replace(/-/g, " ");

  const faculty = router.query.Faculty.toString().replace(/-/g, " ");

  const schoolUrl = `/${school.replace(/\s/g, "-")}`;
  const facultyUrl = `/${faculty.replace(/\s/g, "-")}`;

  const url = schoolUrl + facultyUrl;
  const boxRef = useRef(null);

  const onClick = () => {
    boxRef.current.style.display = "block";
  };
  const closeBox = () => {
    boxRef.current.style.display = "none";
  };

  // const auth = firebase.auth();

  // const uid = auth?.currentUser?.uid;
  // const isAdmin = uid == 'x1Fnwo5WimP9MwIjx4EWeQlyXpE3';
  return (
    data && (
      <Box mt="1rem" pl="1rem">
        <Head>
          <title>
            {faculty} |{school} Academic Plug{" "}
          </title>
        </Head>
        {isAdmin && <AddDepartment />}

        <Typography className="heading">
          <NextLink href={schoolUrl}>{school}</NextLink>- {faculty}{" "}
        </Typography>
        <CoursesGrid list={data?.department} url={url} />
      </Box>
    )
  );
};

export default School;
