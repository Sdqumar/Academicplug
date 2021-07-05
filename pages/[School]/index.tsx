import firebase from "../../config/firebase-config";
import { Container, Heading, Flex, VStack, Box } from "@chakra-ui/react";
import GridOne from "../../components/GridOne";

const firestore = firebase.firestore();

export async function getStaticPaths() {
  const schoolref = await firestore.collection("Schools").get();

  const id = await schoolref.docs.map((doc) => doc.id);

  const paths = id.map((school) => ({
    params: { School: school.replace(/\s/g, "-") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const school = context.params.School;
  const schoolref = await firestore
    .collection("Schools")
    .doc(school.replace(/-/g, " "))
    .get();
  const data = JSON.stringify(schoolref.data());

  return {
    props: {
      data,
    },
  };
}
interface faculty {
  Name:string
}

interface result  {
  Facluties: [faculty];
  Name: string;
  logourl: string;
};
const School = ({ data }) => {
  const result: result = JSON.parse(data);
  return (
    <Container maxW="90%">
      <Heading size="lg" fontSize="50px">
        {result.Name}
      </Heading>
      <GridOne data={result} />
    </Container>
  );
};

export default School;
