import firebase from "../../../../../config/firebase-config";
import { Container, Heading, Flex, VStack, Box } from "@chakra-ui/react";
import CoursesGrid from "../../../../../components/CoursesGrid";
import { useRouter } from "next/router";
const firestore = firebase.firestore();

 
export async function getStaticPaths() {
  const schoolref = await firestore
  .collection("Schools")
  .get();
  const id =  schoolref.docs.map((doc) => doc.data());

  const paths = [];
  
  

  const schoolList = schoolref.docs.map(item=> item.id)
    for await (let school of schoolList) {
  const departmentRes = await firestore
    .collection("Schools")
    .doc(school)
    .collection("Courses")
    .get();

  const departmentList = departmentRes.docs.map((doc) => doc.data());
    departmentList.forEach((item) =>
      paths.push({
        params: {
          School: school.replace(/\s/g, "-"),
          Faculty: item.Faculty.replace(/\s/g, "-"),
          Department: item.Department.replace(/\s/g, "-"),
          Course:item.Name.replace(/\s/g, "-")
        },
      })
    );

}
console.log(paths)
    return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const school = context.params.School;
  const faculty = context.params.Faculty;
  const department = context.params.Department;
  const course = context.params.Course;

  const schoolref = await firestore
    .collection("Schools")
    .doc(school.replace(/-/g, " "))
    .collection("Courses")
    .where("Name", "==", course.replace(/-/g, " "))
    .get()

    const [data] =  schoolref.docs.map(item => item.data())

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
console.log(data)


 const router = useRouter();

  const school = router.query.School.toString().replace(/-/g, " ");
  const faculty = router.query.Faculty.toString().replace(/-/g, " ");
  const department = router.query.Department.toString().replace(/-/g, " ");
  const course = router.query.Course.toString().replace(/-/g, " ");



  return (
    <Container maxW="90%">
      <Heading size="lg" fontSize="50px">

        {school} - {faculty} - {department} - {course}
      </Heading>

    </Container>
  );
};

export default School;
