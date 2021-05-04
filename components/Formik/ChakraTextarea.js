import React from 'react'
import { Field} from 'formik'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea
} from '@chakra-ui/react'



function ChakraTextarea (props) {
  const { label, name, ...rest } = props
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired>
          <FormLabel htmlFor={name} >{label}</FormLabel>
          <Textarea id={name} {...rest} {...field} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
export default ChakraTextarea 
