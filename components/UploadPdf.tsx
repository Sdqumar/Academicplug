import { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputBase from '@material-ui/core/InputBase';

const UploadInput = ({ getfile, label, size, type }) => {
	const [error, seterror] = useState<string | boolean>(null);
	const [fileTemp, setFileTemp] = useState('');

	interface e {
		target: { files: [] | {} };
	}
	15000000;
	const handleFile = (e: e) => {
		const file = e.target.files[0];

		seterror(`Please Upload a ${label} file`);
		setFileTemp(null);
		getfile(null);
		if (file === undefined) {
			seterror(`Please Upload a ${type || label} file`);
		} else if (file.type != `${type}`) {
			seterror(`Please Upload a ${label} file`);
		} else if (file.size > size.byte) {
			seterror(`Upload file less than ${size.mb} file`);
		} else {
			seterror(false);
			getfile(file);
			setFileTemp(URL.createObjectURL(e.target.files[0]));
		}
	};

	return (
		<Box mt={2}>
			<FormControl required variant="filled">
				<form>
					<Box>
						<Typography>Upload {label}</Typography>
					</Box>
					<Box display="flex" flexDirection="column" alignItems="center">
						<InputBase
							required
							type="file"
							name="file"
							onChange={handleFile}
							autoComplete="true"
						/>
					</Box>
					{fileTemp && (
						<a href={fileTemp} target="_blank">
							Click to preview
						</a>
					)}
					{error && (
						<Box mt={1}>
							<FormHelperText> {error}</FormHelperText>
						</Box>
					)}
				</form>
			</FormControl>
		</Box>
	);
};

export default UploadInput;
