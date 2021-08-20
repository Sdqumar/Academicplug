import firebase from "../../../config/firebase-config";
import { Container, Heading, Flex, VStack, Box } from "@chakra-ui/react";
import CoursesGrid from "../../../components/CoursesGrid";
import { useRouter } from "next/router";
import Link from "next/link";

const firestore = firebase.firestore();

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        School: "Federal-University-Minna",
        Faculty: "Education",
      },
    },
  ];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const school = context.params.School;
  const Faculty = context.params.Faculty;

  const schoolref = await firestore
    .collection("Schools")
    .doc(school.replace(/-/g, " "))
    .get();

  const result = schoolref.data();

  const isFaculty = Object.keys(result).includes(Faculty);
  const data = result === undefined || !isFaculty ? result === null : result;
  return {
    props: {
      data,
    },
  };
}

interface faculty {
  Name: string;
}

interface result {
  Facluties: [faculty];
  Name: string;
  logourl: string;
}
const School = ({ data }) => {
  const router = useRouter();

  if (!data) {
    const router = useRouter();
    router.push("/404");
  }
  const school = router.query.School.toString().replace(/-/g, " ");

  const faculty = router.query.Faculty.toString().replace(/-/g, " ");

  const list: string[] = Object.keys(data).filter(
    (item) => item !== "Name" && item !== "logourl"
  );
  const departmentList = [];
  list.forEach((item) => {
    if (faculty === item) departmentList.push(...data[item]);
  });
  const schoolUrl = `/${school.replace(/\s/g, "-")}`;
  const facultyUrl = `/${faculty.replace(/\s/g, "-")}`;

  const url = schoolUrl + facultyUrl;

  return (
    data && (
      <Container maxW="90%">
        <Heading size="lg" fontSize="50px">
          <Link href={schoolUrl}>{school}</Link> - {faculty}
        </Heading>
        <CoursesGrid list={departmentList} url={url} />
      </Container>
    )
  );
};

export default School;
