import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";

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
    <Flex w="100%" justify="center">
      <Flex
        mt="1rem"
        width="65%"
        wrap="wrap"
        justify={{ base: "center", sm: "space-between", md: "space-between" }}
        mb="50rem"
      >
        {schools.map((school) => {
          return (
            <Link
              href={`/${encodeURIComponent(school.Name.replace(/\s/g, "-"))}`}
              key={school.Name}
            >
              <Box
                w={["100%", "45%", "45%", "20%"]}
                key={school.Name}
                boxShadow="base"
                rounded="md"
                bg="gray.20"
                cursor="pointer"
                mb="10px"
                transition="all 0.4s"
                _hover={{
                  boxShadow: "xl",
                }}
              >
                <Image src={school.logourl} w="100%" h="10rem" />
                <Heading size="sm" align="center">
                  {school.Name}
                </Heading>
              </Box>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default SchoolGridList;
