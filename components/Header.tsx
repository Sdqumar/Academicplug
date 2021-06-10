import { Flex, Heading, Box, Text, Icon } from "@chakra-ui/react";
import { IoSchoolSharp } from "react-icons/io5";

export interface HearderProps {}

const Hearder: React.FC<HearderProps> = () => {
  return (
    <Flex bg="#fbae17" justify="space-around" alignItems="center">
      <Box margin="0 100px" alignItems="center" pb="15px">
        <Icon
          as={IoSchoolSharp}
          position="relative"
          left="-40px"
          bottom="-35px"
          w="2rem"
          h="2rem"
        />
        <Heading as="h3" size="lg">
          ACADEMIC
        </Heading>
        <Heading as="h6" size="sm" letterSpacing={10} mt="-7px">
          PLUG
        </Heading>
      </Box>

      <Flex fontWeight="600" justify="space-evenly" w="50%">
        <Box>HOME</Box>
        <Box>SCHOOLS</Box>
        <Box>COURSES</Box>
        <Box>ABOUT</Box>
        <Box>FAQ</Box>
      </Flex>
    </Flex>
  );
};

export default Hearder;
