import { Box, Flex, Heading, Image } from "@chakra-ui/react";
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
      >
        {schools.map((item) => {
          return (
            <Box w={["100%", "45%", "45%", "20%"]} key={item.Name}>
              <Image src={item.logourl} w="100%" h="10rem" />
              <Heading size="sm" align="center">
                {item.Name}
              </Heading>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default SchoolGridList;
