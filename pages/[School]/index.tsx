import firebase from "../../config/firebase-config";
import { Container, Heading } from "@chakra-ui/react";
import GridOne from "../../components/GridOne";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";

const firestore = firebase.firestore();

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    {
      params: { School: "Federal-University-Minna" },
    },
  ];
  return { paths, fallback: "blocking" };
};

export async function getStaticProps(context) {
  const school = context.params.School;
  const schoolref = await firestore
    .collection("Schools")
    .doc(school.replace(/-/g, " "))
    .get();
  const result = schoolref.data();
  const data = result === undefined ? result === null : result;

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
}
export interface faculty {
  Name: string;
}

interface result {
  Facluties: [faculty];
  Name: string;
  logourl: string;
}

const School = ({ data }) => {
  if (!data) {
    const router = useRouter();
    router.push("/404");
  }

  return (
    <Container maxW="90%">
      <Heading size="lg" fontSize="50px">
        {data.Name}
      </Heading>
      <GridOne data={data} />
    </Container>
  );
};

export default School;
