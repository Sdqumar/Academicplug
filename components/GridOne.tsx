import { Box, Flex, Button, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { faculty } from "../pages/[School]";
export interface GridProps {
  data: {
    Facluties: [faculty];
    Name: string;
    logourl: string;
  };
}

const GridOne: React.FC<GridProps> = ({ data }) => {

  return (
    <>
      <Flex w="100%" justify="center">
        <Flex
          mt="1rem"
          width="75%"
          wrap="wrap"
          justify={{ base: "center", sm: "space-between", md: "space-between" }}
        >
          {data.Facluties.map((item) => {
            return (
              <Link
                href={`${data.Name.replace(/\s/g, "-")}/${item?.Name?.replace(
                  /\s/g,
                  "-"
                )}`}
                key={item?.Name}
              >
                <Flex
                  w={["100%", "45%", "45%", "23%"]}
                  bg="rgb(251 174 23)"
                  padding="0.8rem"
                  flexDirection="column"
                  mb="1rem"
                  key={item.Name}
                  cursor="pointer"
                >
                  <Heading
                    m="auto"
                    size="lg"
                    align="center"
                    width="80%"
                    border="3px solid"
                  >
                    {item?.Name}
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

export default GridOne;
