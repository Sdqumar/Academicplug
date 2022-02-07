import {
  Box,
  Button,
  Grid,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";
import firebase from "../config/firebase-config";
import AuthContext from "../components/AuthContext";
import React, { useContext } from "react";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { Alert } from "@material-ui/lab";

type Color = "success" | "info" | "warning" | "error";
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.main,
    maxWidth: "100%",
    height: "5.5rem",
    padding: "1rem",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      padding: "7px",
    },
  },

  academicplug: {
    cursor: "pointer",
    width: "fit-content",
    display: "flex",
    "& svg": {
      marginRight: " 5px",
      fontSize: "40px",
    },
    "& h4": {
      fontWeight: 700,
      [theme.breakpoints.down("xs")]: {
        fontSize: "24px",
      },
    },
    "& h6": {
      letterSpacing: "10px",
      fontWeight: 700,
      marginTop: "-11px",
    },
  },

  logReg: {
    width: "fit-content",
    display: "flex",
    marginRight: "10px",
  },
  welcome: {
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "15rem",
    marginRight: "1rem",

    "& a": {
      fontWeight: 700,
      marginLeft: "5px",
      marginTop: "-2px",
    },
  },
}));

const Header = () => {
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState<Color>("success");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSignOut = async () => {
    const { getAuth, signOut } = await import("firebase/auth");
    const auth = getAuth(firebase);

    signOut(auth)
      .then(() => {
        Cookies.remove("user");
        setCurrentUser(null);
        setOpen(true);
        setAlert("success");
      })
      .catch((error) => {
        setOpen(true);
        setAlert("error");
      });
  };

  const classes = useStyles();
  return (
    <Grid component="header" className={classes.header}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity={alert}>{alert=== "success"?"Successfully Signout!": "Error Signout!"}</Alert>
      </Snackbar>
      <NextLink href="/">
        <Box className={classes.academicplug}>
          <Box>
            <SchoolIcon />
          </Box>
          <Box>
            <Typography variant="h4">ACADEMIC</Typography>
            <Typography variant="h6">PLUG</Typography>
          </Box>
        </Box>
      </NextLink>

      <Box>
        {currentUser !== undefined &&
          (currentUser === null ? (
            <Box className={classes.logReg}>
              <Button>
                <NextLink href="/Signin">Login</NextLink>
              </Button>

              <Button variant="outlined">
                <NextLink href="/Signup">Sign Up</NextLink>
              </Button>
            </Box>
          ) : (
            <Box display="flex">
              <Box
                display={{ xs: "none", sm: "flex" }}
                className={classes.welcome}
              >
                <Typography>Welcome</Typography>
                <NextLink href={"/profile?id=" + currentUser.uid}>
                  <a>{currentUser?.displayName}</a>
                </NextLink>
              </Box>
              <Button variant="outlined" onClick={handleSignOut}>
                Sign Out
              </Button>
            </Box>
          ))}

      </Box>
    </Grid>
  );
};

export default Header;
