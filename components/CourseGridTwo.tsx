import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

export interface CoursesGridProps {}

const CourseGridTwo: React.FC<CoursesGridProps> = () => {
  type schoolList = {
    name: string;
    image: string;
  };
  const courseList = [
    { name: "Introduction to Computer", courseCode: "COM  101" },
    { name: "Introduction to Computer", courseCode: "COM  101" },
    { name: "Introduction to Computer", courseCode: "COM  101" },
    { name: "Introduction to Computer", courseCode: "COM  101" },
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
                w={["40%", "30%", "20%", "10%"]}
                flexDirection="column"
                justifyContent="center"
                border="3px solid"
                borderRadius="10px"
                mb="1rem"
                ml="10px"
              >
                <Text m="auto" size="sm" align="center" p="1rem 0">
                  {item.name}
                </Text>
                <Heading
                  bg="#000"
                  size="sm"
                  fontWeight="700"
                  align="center"
                  color="#fff"
                  p="0.3rem 0"
                  w="100%"
                >
                  {item.courseCode}
                </Heading>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default CourseGridTwo;
