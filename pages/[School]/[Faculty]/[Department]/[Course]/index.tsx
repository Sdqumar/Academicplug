import { useRouter } from "next/router";
import NextLink from "next/link";
import { useContext } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import firebase from "config/firebase-config";
import AuthContext from "components/AuthContext";
import dynamic from "next/dynamic";
import Head from "next/head";
import fileDownload from 'js-file-download';
import Axios from 'axios';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';


const DeleteButton = dynamic(() => import("components/DeleteButton"));
const PDFViewer = dynamic(() => import("components/PDFViewer"));
const Star = dynamic(() => import("components/Star"));

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        School: "Futminna",
        Faculty: "Education",
        Department: "Health-Education",
        Course: "HED-211",
      },
    },
  ];

  return { paths, fallback: "blocking" };
}
export async function getStaticProps(context) {
  const school = context.params.School;
  const course = context.params.Course;

  const { doc, getDoc, getFirestore } = await import("firebase/firestore");
  const firestore = getFirestore(firebase);

  const docRef = doc(firestore, "schools", school, "courses", course);
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
  };
}

const School = ({ data, admins }) => {
  const [currentUser] = useContext(AuthContext);

  let isAdmin = admins?.some((item) => item == currentUser?.uid);

  const user = currentUser?.uid;

  const router = useRouter();

  const school = router.query.School.toString().replace(/-/g, " ");
  const faculty = router.query.Faculty.toString().replace(/-/g, " ");
  const department = router.query.Department.toString().replace(/-/g, " ");
  const course = router.query.Course.toString().replace(/-/g, " ");

  const schoolUrl = `/${school.replace(/\s/g, "-")}`;
  const facultyUrl = `/${faculty.replace(/\s/g, "-")}`;
  const departmentUrl = `/${department.replace(/\s/g, "-")}`;


  function download() {
    Axios.get(data?.pdfRef, {
      responseType: 'blob',
    }).then(res => {
      fileDownload(res.data, `${course}.pdf`);
    });
  }
  return (
    <Box>
      <Head>
        <title>
          {course} | {school} Academic Plug{" "}
        </title>
      </Head>
      <Box mt="1rem">
        <Box mr="1rem" display={isAdmin ? "flex" : "none"} justifyContent="end">
          <DeleteButton school={school} course={course} router={router} />
        </Box>
        <Typography className="heading">
          <NextLink href={schoolUrl}>{school}</NextLink> -{" "}
          <NextLink href={schoolUrl + facultyUrl}>{faculty}</NextLink> -{" "}
          <NextLink href={schoolUrl + facultyUrl + departmentUrl}>
            {department}
          </NextLink>
          -{course}
        </Typography>
      </Box>
      <Box display='flex' width='fit-content' m='1rem' >
        <Star school={school} course={course} user={user} />
      <Button variant='outlined' onClick={download}>
        <Box mb='-5px' mr='5px'>
        <CloudDownloadOutlinedIcon/>
        </Box>
        Download
        </Button>

      </Box>
      <PDFViewer data={data?.pdfRef} />
    </Box>
  );
};

export default School;
