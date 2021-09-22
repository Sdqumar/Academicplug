import { Box, Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
export interface BannerHomeProps {}

const useStyles = makeStyles((theme) => ({
  banner: {
    margin: "auto",
    "& img": {
      filter: "brightness(40%) grayscale(100%)",
    },
    "& h2": {
      fontWeight: 450,
      marginLeft: "10px",
      fontSize: "3rem",
    },
  },
}));

const BannerHome = ({ src, heading, school }) => {
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
        src={src}
        alt={`${school} cover`}
        priority
        quality="20"
      />
      <Box
        position="absolute"
        color="secondary.main"
        width={{ xs: "100%", sm: "40rem" }}
        paddingLeft={{ xs: "0", sm: "1rem" }}
        marginTop={{ xs: "4rem", sm: "6rem" }}
        bottom="3rem"
      >
        <Typography component="h2" variant="h3">
          {heading}
        </Typography>
      </Box>
    </Box>
  );
};

export default BannerHome;
