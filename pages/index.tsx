import { Flex, Container } from "@chakra-ui/react";
import BannerHome from "../components/BannerHome";
import CourseGridTwo from "../components/CourseGridTwo";
import CoursesGrid from "../components/CoursesGrid";
import Footer from "../components/Footer";
import Hearder from "../components/Header";
import SchoolGridList from "../components/SchoolGridList";
import firebase from "../config/firebase-config";

const firestore = firebase.firestore();

export async function getStaticProps(context) {
  const dataref = await firestore.collection("Schools").get();

  const data = dataref.docs.map((doc) => JSON.stringify(doc.data()));

  return {
    props: {
      data,
    },
  };
}

const Index = (props) => {
  const data = props.data.map((i) => JSON.parse(i));

  return (
    <>
      <Hearder />
      <Flex justifyContent="center" maxW="1500px" m="auto" direction="column">
        <BannerHome />
        <SchoolGridList schools={data} />
      </Flex>
      <Footer />
    </>
  );
};

export default Index;
