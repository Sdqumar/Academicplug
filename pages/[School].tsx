import firebase from "../config/firebase-config";
import { Container, Heading,Flex,VStack,Box } from "@chakra-ui/react"
import Link from "next/link";
import Image from "next/image";
const firestore = firebase.firestore();

export async function getStaticPaths() {
  const schoolref = await firestore.collection("Schools").get();

  const id = await schoolref.docs.map((doc) => doc.id);

    const paths = id.map((school) => ({
        params: { School: school },
      }))
   return { paths, fallback: false }
    }

export async function getStaticProps(context) {
  const school = context.params.School;
  const schoolref = await firestore.collection("Schools").doc(school).get();

  const data = schoolref.data()
 
  return {
    props: {
      data,
    },
  };
}

const School = ({data}) => {
  return(
      <Container maxW="90%">
      <Heading size="lg" fontSize="50px">{data.Name}</Heading>
           <Flex
      flexWrap="wrap"
      textAlign="center"
      rounded="lg"
      color="gray.400"
      justify="space-around"
      mt='5rem'
    >
      {data?.Facluties?.map((faculty) => {
        return (
          <Link
          href={faculty}
          key={faculty}
          
           >
           
            <VStack boxShadow="base" p="6" rounded="md" bg="white">
              
              <Box>{faculty}</Box>
            </VStack>
          </Link>
        );
      })}
    </Flex>
      </Container>
      
  )
};

export default School;
