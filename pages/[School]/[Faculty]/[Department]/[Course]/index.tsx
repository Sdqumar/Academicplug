import { useRouter } from "next/router";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import firebase from "config/firebase-config";
import AuthContext from "components/AuthContext";
import dynamic from "next/dynamic";
import Head from "next/head";
import fileDownload from "js-file-download";
import Axios from "axios";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";

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

  if(data == undefined){
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
  }
}
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

  const [isLarge, setIsLager] = useState(data?.size > 1000000);
  
  const [fileSize, setFileSize] = useState(data?.size );
useEffect(()=>{

  if(fileSize < 1000000){
   const size = Math.round(fileSize / 100000)
    setFileSize(size+'kb')
  }else{
    const size = Math.round(fileSize / 1000000)
    setFileSize(size+'MB')
  }
},[])

  function download() {
    Axios.get(data?.pdfRef, {
      responseType: "blob",
    }).then((res) => {
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
      <Box display="flex" width="fit-content" m="1rem">
        <Star school={school} course={course} user={user} />
        <Button variant="outlined" onClick={download}>
          <Box mb="-5px" mr="5px">
            <CloudDownloadOutlinedIcon />
          </Box>
          Download
        </Button>
      </Box>
      <Box textAlign='left' ml='1rem' fontSize='1rem' >Size: ~{fileSize}</Box>
      {isLarge && (
        <Box textAlign="center" fontSize="1.5rem" m='2rem 0'>
          File size is more than 1mb
          <br/>
          To view the pdf, click here
          <br/>
          <br/>
          <Button variant='outlined' onClick={()=>setIsLager(false)}>view pdf</Button>
          
        </Box>
      )}
      {!isLarge && <PDFViewer data={data?.pdfRef} />}{" "}
    </Box>
  );
};

export default School;
