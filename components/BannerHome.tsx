import { Box, Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import "../public/banner.webp";
export interface BannerHomeProps {}

const useStyles = makeStyles((theme) => ({
  banner: {
    margin: "auto",
    "& img": {
      filter: "brightness(40%) grayscale(100%)",
    },
    "& h2": {
      fontWeight: 450,

      fontSize: "3rem",
    },
  },
}));

const BannerHome: React.FC<BannerHomeProps> = () => {
  const classes = useStyles();
  return (
    <Box
      position="relative"
      display="block"
      width={{ xs: "100%", sm: "100%" }}
      height="20rem"
      className={classes.banner}
    >
      <Image
        layout="fill"
        objectFit="cover"
        src="/banner.jpg"
        alt="Home-Banner"
      />
      <Box
        position="absolute"
        color="secondary.main"
        width={{ xs: "100%", sm: "40rem" }}
        paddingLeft={{ xs: "0", sm: "1rem" }}
        marginTop={{ xs: "4rem", sm: "6rem" }}
      >
        <Typography component="h2" variant="h3">
          Courses for Nigerian Students
        </Typography>
      </Box>
    </Box>
  );
};

export default BannerHome;
