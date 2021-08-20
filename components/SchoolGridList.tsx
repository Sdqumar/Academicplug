import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { error } from "node:console";
import { useState } from "react";

export interface SchoolGridListProps {
  schools: [
    {
      Name: string;
      logourl: string;
    }
  ];
}

const SchoolGridList: React.FC<SchoolGridListProps> = ({ schools }) => {
  return (
    <Box maxW="60rem" m="auto" mt="2rem">
      <Flex
        maxW="60rem"
        wrap="wrap"
        justify={{ md: "space-evenly", sm: "center" }}
      >
        {schools.map((school) => {
          return (
            <Link
              href={`/${encodeURIComponent(school.Name.replace(/\s/g, "-"))}`}
              key={school.Name}
            >
              <Box
                w="12rem"
                key={school.Name}
                boxShadow="base"
                m="0 10px"
                rounded="md"
                bg="gray.20"
                cursor="pointer"
                mb="2rem"
                transition="all 0.4s"
                _hover={{
                  boxShadow: "xl",
                }}
              >
                <Image
                  src={school.logourl}
                  onError={() => console.log("error")}
                  w="100%"
                  h="10rem"
                />

                <Heading size="sm" align="center">
                  {school.Name}
                </Heading>
              </Box>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

export default SchoolGridList;
