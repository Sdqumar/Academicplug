import { Box, Flex, Button, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";

const CoursesGrid = ({ list, url }) => {
  return (
    <>
      <Flex m="auto" justify="center">
        <Flex
          mt="1rem"
          wrap="wrap"
          justify={{ md: "space-between", sm: "center" }}
        >
          {list?.map((item) => {
            return (
              <Link href={`${url}/${item.replace(/\s/g, "-")}`} key={item}>
                <Flex
                  w="14rem"
                  mr="20px"
                  bg="rgb(251 174 23)"
                  padding="0.8rem"
                  flexDirection="column"
                  mb="1rem"
                  key={item}
                  cursor="pointer"
                >
                  <Heading
                    m="auto"
                    size="lg"
                    align="center"
                    width="80%"
                    border="3px solid"
                  >
                    {item}
                  </Heading>
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default CoursesGrid;
