import { Box, Typography } from "@material-ui/core";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    window.onload = async function () {
      const { getAnalytics, logEvent } = await import("firebase/analytics");
      const analytics = getAnalytics();
      logEvent(analytics, "notification_received");
    };
  });

  return (
    <footer>
      <Box
        maxWidth="100%"
        bgcolor="#000"
        color="secondary.main"
        justifyContent="space-around"
        alignItems="center"
        p="0.7rem"
        display="flex"
      >
        <Typography> {"ACADEMIC PLUG 2022\u00A9 "}</Typography>
        <a
          style={{ color: "#fbae17" }}
          href="https://github.com/Sdqumar/Academicplug"
          target="_blank"
        >
          GitHub
        </a>
      </Box>
    </footer>
  );
};

export default Footer;
