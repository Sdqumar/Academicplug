import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ data }) {
	const [width, setWidth] = useState(window.innerWidth);
	const [scale, setScale] = useState(0.47);

	useEffect(() => {
		width > 350 && setScale(0.57);
		width > 400 && setScale(0.67);
		width > 600 && setScale(1);
		width > 700 && setScale(1.2);
		width > 900 && setScale(1.6);
		width > 1400 && setScale(2);
	}, []);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}

	function previousPage() {
		changePage(-1);
	}

	function nextPage() {
		changePage(1);
	}

	return (
		<Box width="100vw" m="auto">
			<Document file={data} onLoadSuccess={onDocumentLoadSuccess}>
				<Page
					scale={scale}
					className="react-pdf__Page__canvas"
					pageNumber={pageNumber}
				/>
			</Document>
			<Flex flexDir="column" align="center" mb="2rem">
				<Box d="block">
					Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
				</Box>
				<Box>
					<Button
						type="button"
						color="red"
						disabled={pageNumber <= 1}
						onClick={previousPage}
					>
						Previous
					</Button>
					<Button
						type="button"
						disabled={pageNumber >= numPages}
						onClick={nextPage}
						ml="1rem"
					>
						Next
					</Button>
				</Box>
			</Flex>
		</Box>
	);
}
