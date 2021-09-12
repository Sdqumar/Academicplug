import React from 'react';
import { Field } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function ChakraInput(props) {
	const { label, name, ...rest } = props;
	return (
		<Field name={name}>
			{({ field, form }) => {
				return (
					<FormControl fullWidth>
						<InputLabel htmlFor={name}>{label}</InputLabel>
						<Input
							id={name}
							error={form.errors[name] && form.touched[name]}
							{...rest}
							{...field}
						/>
						<FormHelperText error={form.errors[name] && form.touched[name]}>
							{form.errors[name]}
						</FormHelperText>
					</FormControl>
				);
			}}
		</Field>
	);
}

export default ChakraInput;
