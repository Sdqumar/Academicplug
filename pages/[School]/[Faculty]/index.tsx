import firebase from "../../../config/firebase-config";
import { Container, Heading, Flex, VStack, Box } from "@chakra-ui/react";
import CoursesGrid from "../../../components/CoursesGrid";
import { useRouter } from "next/router";

const firestore = firebase.firestore();




export async function getStaticPaths() {
  const schoolref = await firestore.collection("Schools").get();

  const id =  schoolref.docs.map((doc) => doc.data());

  const paths = [];
  
  
  id.forEach((x) =>
    x?.Facluties?.forEach((y) =>
      paths.push({
        params: {
          School: x.Name.replace(/\s/g, "-"),
          Faculty: y?.Name.replace(/\s/g, "-"),
        },
      })
    )
  );

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const school = context.params.School;
  const Faculty = context.params.Faculty;

  const schoolref = await firestore
    .collection("Schools")
    .doc(school.replace(/-/g, " "))
    .get();

  const data =  schoolref.data();
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
  const router = useRouter();

  const school = router.query.School.toString().replace(/-/g, " ");

  const faculty = router.query.Faculty.toString().replace(/-/g, " ");

  const [{Department}] = data.Facluties.filter(item => item.Name === faculty);


 
  
  


  const url = `/${school.replace(/\s/g, "-")}/${faculty.replace(/\s/g, "-")}`   
    
   
  return (
    <Container maxW="90%">
      <Heading size="lg" fontSize="50px">
        {school} - {faculty}
      </Heading>
      <CoursesGrid data={Department} url={url} />
    </Container>
  );
};

export default School;
