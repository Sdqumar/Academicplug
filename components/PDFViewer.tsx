import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { ProgressBar } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFViewer = ({ data }) => {
	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
			<div >
				<Viewer
					fileUrl={data}
					renderLoader={(percentages: number) => (
						<div style={{ width: '240px', margin: 'auto' }}>
							<ProgressBar progress={Math.round(percentages)} />
						</div>
					)}
				/>
				;
			</div>
		</Worker>
	);
};
export default PDFViewer;
