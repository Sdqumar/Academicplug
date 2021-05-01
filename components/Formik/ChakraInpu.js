import React from 'react'
import { Field } from 'formik'
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'

function ChakraInpu (props) {
  const { formProps,label, name, ...rest } = props
  return (
    <Field name={name}>
      {({form}) => {
          const { setFieldValue } = form
        return(
          <FormControl isInvalid={form.errors[name] && form.touched[name]} isRequired>
          <FormLabel htmlFor={name} >{label}</FormLabel>
          <Field>
        {() => {
          return (
            <Input type="file" label="input" name="file"  onChange={e => setFieldValue('file',e.target.files[0])}/>
          )
        }}
      </Field>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
        
        )
}}
    </Field>
  )
}

export default ChakraInpu
