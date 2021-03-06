import { Box, Typography, makeStyles, Link } from "@material-ui/core";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";

export interface SchoolGridListProps {
  schools: [
    {
      name: string;
      slug: string;
      logourl: string;
    }
  ];
}

const useStyles = makeStyles((theme) => ({
  schoolItem: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    boxShadow: " 0 0px 0px 0 rgb(0 0 0 / 0%), 0 1px 6px 0 rgb(0 0 0 / 10%)",
    borderRadius: "5px",
    cursor: "pointer",

    "& h6": {
      fontSize: "16px",
      textAlign: "center",
      marginTop: "8px",
      fontWeight: 600,
      maxHeight: "52px",
    },
  },
}));

const SchoolGridList: React.FC<SchoolGridListProps> = ({ schools }) => {
  const router = useRouter();

  const classes = useStyles();
  return (
    <Box maxWidth="55rem" m="auto" mt="2rem">
      <Box display="flex" flexWrap="wrap" justifyContent="center" role='schoolGridList'>
        {schools.map((school,index) => {
          const imgSrc = `/logo/${school.slug}.png`;

          return (
            <NextLink
              href={{
                pathname: "/" + school?.slug,
                query: { school: school?.name },
              }}
              passHref
              key={school?.slug}
            >
              <Link >
                <Box
                data-testid={`schoolitem-${school.name}`}
                  width={{ xs: "9rem", md: "11rem" }}
                  height={{ xs: "12rem", md: "12rem" }}
                  padding="4px 0"
                  paddingBottom={{ xs: "21px", md: "0" }}
                  m="0 10px"
                  mb="2rem"
                  className={classes.schoolItem}
                  onClick={() =>
                    router.push({
                      pathname: "/" + school?.slug,
                      query: { school: school?.name },
                    })
                  }
                >
                  <Image
                    src={imgSrc}
                    width="200%"
                    height="200%"
                    objectFit="contain"
                    alt={`${school?.name} logo`}
                    priority
                    quality={5}
                  />
                  <Typography variant="h6">{school?.name}</Typography>
                </Box>
              </Link>
            </NextLink>
          );
        })}
      </Box>
    </Box>
  );
};

export default SchoolGridList;
