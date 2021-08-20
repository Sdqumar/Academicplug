import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import { Flex, Spacer, Box, Button, useToast, Text } from "@chakra-ui/react";
import firebase from "../config/firebase-config";
import { useRouter } from "next/router";

//initialize firestore

function ForgetPassword() {
  const router = useRouter();

  const initialValues = {
    Email: "",
  };
  const validationSchema = Yup.object().shape({
    Email: Yup.string().required("Required").email("Invalid email format"),
  });

  const toast = useToast();
  const displayToast = (title, status) => {
    toast({
      title,
      position: "top",
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  const onSubmit = (values, actions) => {
    const email = values.Email;
    actions.setSubmitting(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        displayToast("Email Sent Successfully", "success");
        actions.resetForm();
        actions.setSubmitting(false);
        setTimeout(() => router.reload(), 5000);
      })
      .catch((error) => {
        displayToast("Email Not Found", "error");
      });
  };

  return (
    <Flex align="center" justify="center" mt="5rem">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box mt="20px">
                <Text fontSize="1.5rem" mb="10px">
                  Please Enter your Emaill Address
                </Text>
                <FormikControl
                  control="chakraInput"
                  type="name"
                  label="Email Address"
                  name="Email"
                />
              </Box>

              <Spacer />
              <Box mt={4} textAlign="center">
                <Button
                  colorScheme="teal"
                  variant="outline"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
}
export default ForgetPassword;
