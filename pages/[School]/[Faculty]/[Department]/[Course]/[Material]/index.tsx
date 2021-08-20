import firebase from "config/firebase-config";
import { Container, Heading, Flex, useToast } from "@chakra-ui/react";
import DeleteButton from "components/DeleteButton";
import { useRouter } from "next/router";
import PDFViewer from "components/PDFViewer";
import Link from "next/link";

const firestore = firebase.firestore();

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        School: "Federal-University-Minna",
        Faculty: "Education",
        Department: "Health-Education",
        Course: "HED-112",
        Material: "Information-Tech",
      },
    },
  ];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const school = context.params.School;
  const course = context.params.Course;

  const schoolref = await firestore
    .collection("Schools")
    .doc(school.replace(/-/g, " "))
    .collection("Courses")
    .where("Course", "==", course.replace(/-/g, " "))
    .get();

  const [data] = schoolref.docs.map((item) => item.data());
  return {
    props: {
      data,
    },
  };
}

const School = ({ data }) => {
  const router = useRouter();

  const school = router.query.School.toString().replace(/-/g, " ");
  const faculty = router.query.Faculty.toString().replace(/-/g, " ");
  const department = router.query.Department.toString().replace(/-/g, " ");
  const course = router.query.Course.toString().replace(/-/g, " ");
  const material = router.query.Material.toString().replace(/-/g, " ");

  const schoolUrl = `/${school.replace(/\s/g, "-")}`;
  const facultyUrl = `/${faculty.replace(/\s/g, "-")}`;
  const departmentUrl = `/${department.replace(/\s/g, "-")}`;
  const courseUrl = `/${course.replace(/\s/g, "-")}`;

  const [{ pdfurl }] = data.Materials.filter((item) => item.Name == material);

  const toast = useToast();
  const displayToast = () => {
    toast({
      title: "Material Deleted",
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    firestore
      .collection("Schools")
      .doc(school)
      .collection("Courses")
      .doc(course)
      .update({
        Materials: firebase.firestore.FieldValue.arrayRemove({
          Name: material,
          pdfurl,
        }),
      })
      .then(() => {
        console.log("Document successfully deleted!");
        displayToast();

        setTimeout(() => router.back(), 2500);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <Container maxW="90%">
      <Flex justify="space-between" mt="1rem">
        <Heading size="lg" fontSize="50px" w="95%">
          <Link href={schoolUrl}>{school}</Link> -{" "}
          <Link href={schoolUrl + facultyUrl}>{faculty}</Link> -{" "}
          <Link href={schoolUrl + facultyUrl + departmentUrl}>
            {department}
          </Link>{" "}
          -{" "}
          <Link href={schoolUrl + facultyUrl + departmentUrl + courseUrl}>
            {course}
          </Link>
          - {material}
        </Heading>
        <DeleteButton deleteFuntion={handleDelete} name="Material" />
      </Flex>
      <PDFViewer data={pdfurl} />
    </Container>
  );
};

export default School;
