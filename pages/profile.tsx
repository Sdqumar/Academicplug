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
import BasicTable from "@/components/profile/Table";

const COLUMNS = [
  {
    Header: "Course",
    accessor: "Course",
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
      {data && <BasicTable TableData={data} COLUMNS={COLUMNS} />}
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  const db = getFirestore(firebase);
  const materials = query(
    collectionGroup(db, "courses"),
    where("uid", "==", id)
  );
  const querySnapshot = await getDocs(materials);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return {
    props: {
      data,
    },
  };
}
