import React from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { Box} from '@chakra-ui/react';

export default function Test() {
const { data,} = useFetch('http://localhost:4000/Pdf');
  return (
  data && 
  <Box mt={10}>
  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
    <div style={{ height: '750px' }}>
        <Viewer fileUrl={data.test} />
    </div>
</Worker>
</Box>
  );
}