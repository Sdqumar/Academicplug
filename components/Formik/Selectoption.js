import React from "react";
import { Field, ErrorMessage } from "formik";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

function Selectoptions(props) {
  const { label, name, options, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl
            isInvalid={form.errors[name] && form.touched[name]}
            isRequired
          >
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Select
              id={name}
              placeholder={`Select your ${label}`}
              {...rest}
              {...field}
            >
              {options?.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.key}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export default Selectoptions;
