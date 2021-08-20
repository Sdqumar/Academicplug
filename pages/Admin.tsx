import { Heading } from "@chakra-ui/react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
const Admin = (props) => {
  return (
    <>
      <Heading m="1rem" size="2xl">
        Admin Panel
      </Heading>

      <UnorderedList m="2rem" ml="4rem" fontSize="1.5rem">
        <ListItem>
          <Link href="/AddSchool">Add School</Link>
        </ListItem>
        <ListItem>
          <Link href="/AddFaculty">Add Faculty</Link>
        </ListItem>
        <ListItem>
          <Link href="/AddDepartment">Add Department</Link>
        </ListItem>
      </UnorderedList>
    </>
  );
};

export default Admin;
