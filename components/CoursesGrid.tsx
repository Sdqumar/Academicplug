import { Box, Flex, Button, Heading, Image } from "@chakra-ui/react";

export interface CoursesGridProps {}

const CoursesGrid: React.FC<CoursesGridProps> = () => {
  type schoolList = {
    name: string;
    image: string;
  };
  const courseList = [
    { name: "Introduction to Computer", courseCode: "COM  101" },
    { name: "Introduction to Computer", courseCode: "COM  101" },
    { name: "Introduction to Computer", courseCode: "COM  101" },
    { name: "Introduction to Computer", courseCode: "COM  101" },
  ];
  return (
    <>
      <Flex w="100%" justify="center">
        <Flex
          mt="1rem"
          width="85%"
          wrap="wrap"
          justify={{ base: "center", sm: "space-between", md: "space-between" }}
        >
          {courseList.map((item) => {
            return (
              <Flex
                w={["100%", "45%", "45%", "23%"]}
                bg="rgb(251 174 23)"
                padding="1rem"
                pb="0.5rem"
                flexDirection="column"
                mb="1rem"
              >
                <Box border="3px solid" pb="3rem">
                  <Heading
                    m="auto"
                    mb="0.5rem"
                    size="lg"
                    align="center"
                    padding="0.4rem"
                    borderBottom="2px solid"
                    width="80%"
                  >
                    {item.courseCode}
                  </Heading>
                  <Heading size="sm" fontWeight="700" align="center">
                    {item.name}
                  </Heading>
                </Box>
                <Box
                  m="0.5rem"
                  bg="#000"
                  color="#fff"
                  width="5rem"
                  alignSelf="center"
                  borderRadius="0"
                  fontSize="0.8rem"
                  textAlign="center"
                >
                  View
                </Box>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default CoursesGrid;
