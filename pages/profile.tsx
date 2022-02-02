import AuthContext from "../components/AuthContext";
import { useContext, useEffect } from "react";
import { Box } from "@material-ui/core";
import firebase from "../config/firebase-config";
import {
  getFirestore,
  collectionGroup,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import BasicTable from "@/components/profile/BasicTable";
import AdminTable from "@/components/profile/Table";
import NextLink from "next/link";

const COLUMNS = [
  {
    Header: "Course",
    accessor: row =>{
      
      const {School, Faculty,Department,Course} = row
      
      return(
        <NextLink href={`/${School}/${Faculty.replace(/\s/g, "-")}/${Department.replace(/\s/g, "-")}/${Course.replace(/\s/g, "-")}`} passHref>
          <a style={{fontWeight:700}}>{Course}</a>
          </NextLink>
      )
    }
  },
  {
    Header: "Code",
    accessor: "Code",
  },

  {
    Header: "Department",
    accessor: "Department",
  },
  {
    Header: "Faculty",
    accessor: "Faculty",
  },
  {
    Header: "School",
    accessor: "School",
  },
  {
    Header: "Approve",
    accessor: "Approve",
  },
];

export default function Profile({ data }) {
  const [currentUser, setCurrentUser] = useContext(AuthContext);

  return (
    <Box marginX={5}>
      <h1>Hello {currentUser?.displayName}</h1>

      <h3>List of Materials</h3>
      {data && <AdminTable TableData={data.materials} COLUMNS={COLUMNS} />}
      <br/>
      <br/>
      {/* {data && <BasicTable TableData={data.userMaterials} COLUMNS={COLUMNS} />} */}
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  const db = getFirestore(firebase);

  const getUserMaterials = async () => {
    const ref = query(collectionGroup(db, "courses"), where("uid", "==", id));
    const querySnapshot = await getDocs(ref);
    let materials = [];
    querySnapshot.forEach((doc) => {
      materials.push(doc.data());
    });
    return materials;
  };
  const getMaterials = async () => {
    const ref = query(collectionGroup(db, "courses"));
    const querySnapshot = await getDocs(ref);
    let materials = [];
    querySnapshot.forEach((doc) => {
      materials.push(doc.data());
    });
    return materials;
  };


  const userMaterials  = await  getUserMaterials()
  const materials = await getMaterials()


  return {
    props: {
      data: {
        userMaterials,
        materials
      },
    },
  };
}
