import React from 'react';
import ChakraTextarea from './ChakraTextarea';

import ChakraInput from './ChakraInput';

function FormikControl(props) {
	const { control, ...rest } = props;
	switch (control) {
		case 'textarea':
			return <ChakraTextarea {...rest} />;

		case 'chakraInput':
			return <ChakraInput {...rest} />;
		default:
			return null;
	}
}

export default FormikControl;
