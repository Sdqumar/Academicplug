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
  const list = Object.keys(data).filter(
    (item) => item !== "Name" && item !== "logourl"
  );
  return (
    <>
      <Flex w="100%" justify="center">
        <Flex
          mt="1rem"
          width="100%"
          wrap="wrap"
          justify={{ md: "flex-start", sm: "center" }}
        >
          {list.map((item) => {
            return (
              <Link
                href={`/${data.Name.replace(/\s/g, "-")}/${item?.replace(
                  /\s/g,
                  "-"
                )}`}
                key={item}
              >
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
                    width="10rem"
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

export default GridOne;
