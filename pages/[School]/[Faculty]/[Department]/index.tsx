import firebase from "../../../../config/firebase-config";
import { Container, Heading, Flex, VStack, Box } from "@chakra-ui/react";
import CoursesGrid from "../../../../components/CoursesGrid";
import { useRouter } from "next/router";
const firestore = firebase.firestore();

 
export async function getStaticPaths() {
  const schoolref = await firestore
    .collection("Schools")
    .get();
    const schoolRes =  schoolref.docs.map((doc) => doc.data());

    const paths = [];
    
    
    schoolRes.forEach((school) =>
      school?.Facluties?.forEach((faculty) =>
      faculty?.Department?.forEach(department=>
        paths.push({
          params: {
            School: school.Name.replace(/\s/g, "-"),
            Faculty: faculty?.Name.replace(/\s/g, "-"),
            Department: department.replace(/\s/g, "-")
          },
        })
      ))
    );
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const school = context.params.School;
  const faculty = context.params.Faculty;
  const department = context.params.Department;

  const schoolref = await firestore
    .collection("Schools")
    .doc(school.replace(/-/g, " "))
    .collection("Courses")
    .where("Department", "==", department.replace(/-/g, " "))
    .get()
    const data =  schoolref.docs.map(item => item.data().Name)
    console.log(data)
  return {
    props: {
      data,
    },
  };
}

type data = {
  Facluties: [string];
  Name: string;
  logourl: string;
};
const School = ({data}) => {
 
  const schooldata = async()=>{
  
}
schooldata()
 const router = useRouter();

  const school = router.query.School.toString().replace(/-/g, " ");

  const faculty = router.query.Faculty.toString().replace(/-/g, " ");
  const department = router.query.Department.toString().replace(/-/g, " ");

  const url = `/${school.replace(/\s/g, "-")}/${faculty.replace(/\s/g, "-")}/${department.replace(/\s/g, "-")}`


  return (
    <Container maxW="90%">
      <Heading size="lg" fontSize="50px">
        {school} - {faculty} - {department}
      </Heading>
      <CoursesGrid data={data} url={url} />
    </Container>
  );
};

export default School;
