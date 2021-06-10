<<<<<<< HEAD
import React from 'react'
import ChakraInpu from './ChakraInpu'
import ChakraTextarea from './ChakraTextarea'
import Selectoption from './Selectoption'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import ChakraInput from './ChakraInput'

function FormikControl (props) {
  const { control, ...rest } = props
  switch (control) {
    case 'ChakraInpu':
      return <ChakraInpu {...rest} />
    case 'textarea':
      return <ChakraTextarea {...rest} />
    case 'Selectoption':
      return <Selectoption {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    case 'chakraInput':
      return <ChakraInput {...rest} />
    default:
      return null
  }
}

export default FormikControl
=======
import React from 'react'
import ChakraInpu from './ChakraInpu'
import ChakraTextarea from './ChakraTextarea'
import Selectoption from './Selectoption'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import ChakraInput from './ChakraInput'

function FormikControl (props) {
  const { control, ...rest } = props
  switch (control) {
    case 'ChakraInpu':
      return <ChakraInpu {...rest} />
    case 'textarea':
      return <ChakraTextarea {...rest} />
    case 'Selectoption':
      return <Selectoption {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    case 'chakraInput':
      return <ChakraInput {...rest} />
    default:
      return null
  }
}

export default FormikControl
>>>>>>> master
