import React from 'react'
import { Field } from 'formik'
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'

function ChakraInput (props) {
  const { label, name, ...rest } = props
  return (
    <Field name={name}>
      {({ field, form }) => 
      (
        <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired>
          <FormLabel htmlFor={name} >{label}</FormLabel>
          <Input id={name} {...rest} {...field} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default ChakraInput
