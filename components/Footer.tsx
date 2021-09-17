import { Box, Typography } from "@material-ui/core";
export interface FooterProps {}
import { getAnalytics, logEvent } from "firebase/analytics";
import { useEffect } from "react";

const Footer: React.FC<FooterProps> = () => {
  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "notification_received");
  });

  return (
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
  );
};

export default Footer;
