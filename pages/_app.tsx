import { Box, ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import firebase from "../config/firebase-config";
import Hearder from "../components/Header";
import AuthContext from "../components/AuthContext";
import Footer from "../components/Footer";

import { extendTheme } from "@chakra-ui/react";
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

const auth = firebase.auth();

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState<undefined | {}>();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, [currentUser]);

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider value={currentUser}>
        <Box maxW="100vw" height="100vh" d="block">
          <Hearder />
          <Component {...pageProps} />
          <Footer />
        </Box>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
