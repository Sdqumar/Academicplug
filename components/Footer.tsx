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
    >
      <Typography> {"ACADEMIC PLUG 2021\u00A9 "}</Typography>
    </Box>
    </footer>
  );
};

export default Footer;
