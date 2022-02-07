import { Box } from "@material-ui/core";
import firebase from "../config/firebase-config";
import Head from "next/head";

import dynamic from "next/dynamic";
import RecentCourses from "@/components/Home/RecentCourses";
const BannerHome = dynamic(() => import("@/components/Home/BannerHome"));
const SchoolGridList = dynamic(
  () => import("@/components/Home/SchoolGridList")
);

export async function getServerSideProps() {
  const { getDocs, getFirestore, collection, query, collectionGroup, where } =
    await import("firebase/firestore");
  const firestore = await getFirestore(firebase);

  const q = await getDocs(collection(firestore, "schools"));
  const schools = q.docs.map((doc) => doc.data());

  const getUserMaterials = async () => {
    const ref = query(
      collectionGroup(firestore, "courses"),
      where("Approve", "==", "Approve")
    );
    const querySnapshot = await getDocs(ref);
    let materials = [];
    querySnapshot.forEach((doc) => {
      materials.push(doc.data());
    });
    return materials;
  };

  const materials = await getUserMaterials();

  return {
    props: {
      schools,
      materials,
    },
  };
}

const Index = ({ schools, materials }) => {
  console.log(materials);
  
  return (
    <>
      <Head>
        <title>Home | Academic Plug </title>
      </Head>
      <Box
        justifyContent="center"
        maxWidth={{ md: "95%", base: "100%" }}
        mt={{ base: "0px", sm: "2rem" }}
        m="auto"
        display="block"
      >
        <BannerHome
          src="/banner.webp"
          heading=" Courses for Nigerian Students"
        />
        <SchoolGridList schools={schools} />
        <RecentCourses list={materials}/>
      </Box>
    </>
  );
};

export default Index;
