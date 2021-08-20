import Viewer, { Worker } from "@phuocng/react-pdf-viewer";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";
import { Box, Text } from "@chakra-ui/react";
import { error } from "node:console";
import { useState } from "react";

export default function PDFViewer({ data }) {
  const [isError, setIsError] = useState(false);
  const [isloading, setIsloading] = useState(true);
  fetch(data).then((data) => {
    if (data.status === 404) {
      setIsError(true);
    }
    setIsloading(false);
  });

  if (isError)
    return (
      <Box justifyContent="center" alignItems="center" m="1rem">
        <Text color="red" fontSize="2rem" align="center">
          OOPS! Sorry Material Not Found
        </Text>
        ;
      </Box>
    );

  return (
    !isloading && (
      <Box mt={10}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
          <div style={{ height: "750px" }}>
            <Viewer fileUrl={data} />
          </div>
        </Worker>
      </Box>
    )
  );
}
