import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import firebase from "../config/firebase-config";

export async function getStaticProps(context) {
  const dataref = await firebase.firestore().collection("Schools").get();

  const data = dataref.docs.map((doc) => JSON.stringify(doc.data()));

  return {
    props: {
      data,
    },
  };
}
export interface HomeProps {
  data?: [];
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const res = data.map((i) => JSON.parse(i));

  return (
    <Flex
      flexWrap="wrap"
      textAlign="center"
      rounded="lg"
      color="gray.400"
      bg="gray.50"
      justify="space-around"
    >
      {res.map((school) => {
        return (
          <Link href={school.Name} key={school.Name}>
            <VStack boxShadow="base" p="6" rounded="md" bg="white">
              <Image
                alt={school.Name}
                width={200}
                height={200}
                src={school.logourl}
              />
              <Box>{school.Name}</Box>
            </VStack>
          </Link>
        );
      })}
    </Flex>
  );
};
