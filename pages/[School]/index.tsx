import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import firebase from "config/firebase-config";
import { Box, Typography } from "@material-ui/core";
import { useRef, useContext } from "react";
import AuthContext from "components/AuthContext";
import dynamic from "next/dynamic";
import Head from "next/head";

const AddFaculty = dynamic(() => import("components/AddFaculty"));
const CoursesGrid = dynamic(() => import("components/CoursesGrid"));

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    {
      params: { School: "Futminna" },
    },
  ];
  return { paths, fallback: "blocking" };
};

export async function getStaticProps(context) {
  const { getDocs, doc, getDoc, getFirestore, collection } = await import(
    "firebase/firestore"
  );
  const firestore = getFirestore(firebase);

  const school = context.params.School;
  const q = await getDocs(collection(firestore, "schools", school, "faculty"));
  const data = q.docs.map((doc) => doc.data());

  const adminRef = await getDoc(doc(firestore, "SuperUser", "Admin"));

  let admin = adminRef?.data()?.SuperAdmin;

  // createSiteMap
  const fs = await import("fs");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${data
        .map((item) => {
          const route = item.name.replace(/\s/g, "-");
          return `<url><loc>${`https://www.academicplug.com/${school}/${route}`}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`;
        })
        .join("")}</urlset>`;

  fs.writeFileSync(`public/facultySiteMaps/${school}-sitemap.xml`, sitemap);
  return {
    props: {
      data,
      admin,
    },
    revalidate: 10000,
  };
}

const School = ({ data, admin }) => {
  const [currentUser] = useContext(AuthContext);
  const router = useRouter();
  const school = router.query.school;
  const School = router.query.School;

  const list = data.map((item) => item?.name);

  const boxRef = useRef(null);

  let isAdmin = admin === currentUser?.uid;

  const onClick = () => {
    boxRef.current.style.display = "block";
  };
  const closeBox = () => {
    boxRef.current.style.display = "none";
  };
  return (
    <>
      <Head>
        <title>{school} | Academic Plug </title>
      </Head>

      <Box mt="1rem" pl="1rem">
        {isAdmin && <AddFaculty school={School} />}

        <Typography variant="h3" className="heading">
          {school ? school : School}
        </Typography>
        <CoursesGrid list={list} url={`/${School}`} />
      </Box>
    </>
  );
};

export default School;
