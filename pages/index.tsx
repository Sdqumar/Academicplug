import { Box } from "@material-ui/core";
import firebase from "config/firebase-config";
import Head from "next/head";

import dynamic from "next/dynamic";
const BannerHome = dynamic(() => import("components/BannerHome"));
const SchoolGridList = dynamic(() => import("components/SchoolGridList"));

export async function getStaticProps() {
  const { getDocs, getFirestore, collection } = await import(
    "firebase/firestore"
  );
  const firestore = await getFirestore(firebase);

  const q = await getDocs(collection(firestore, "schools"));
  const data = q.docs.map((doc) => doc.data());

  //   const fs = await import("fs");
  //   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  //       ${data
  //         .map((item) => {
  //           const route = item.name.replace(/\s/g, "-");
  //           return `<url>
  //     <loc>${`https://www.academicplug.com/${route}`}</loc>
  //     <lastmod>${new Date().toISOString()}</lastmod>
  // </url>`;
  //         })
  //         .join("")}
  //   </urlset>
  // `;

  //   fs.writeFileSync(`public/schools-sitemap.xml`, sitemap);

  return {
    props: {
      data,
    },
    revalidate: 100000,
  };
}

const Index = ({ data }) => {
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
        <SchoolGridList schools={data} />
      </Box>
    </>
  );
};

export default Index;
