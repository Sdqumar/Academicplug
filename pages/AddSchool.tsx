import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import { Flex, Spacer, Box, Button, useToast } from "@chakra-ui/react";
import firebase from "../config/firebase-config";
import UploadSchoolImg from "../components/UploadSchoolImg";

//initialize firestore
const firestore = firebase.firestore();

function AddSchool() {
  const initialValues = {
    SchoolName: "",
  };

  const validationSchema = Yup.object().shape({
    SchoolName: Yup.mixed().required("Required"),
  });

  const [logourl, setLogourl] = useState(null);
  const getfile = (url) => {
    setLogourl(url);
  };

  const toast = useToast();

  const displayToast = () => {
    toast({
      title: "School created",
      position: "top",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const onSubmit = (values, actions) => {
    actions.setSubmitting(true);
    const school = values.SchoolName;
    //created a new courses array to the database for future adding of courses into the array
    const Courses = [];
    firestore
      .collection("Schools")
      .doc(school)
      .set({
        logourl,
        Name: school,
        createdAt: new Date(),
      })
      .then(() => {
        console.log("Document successfully written!");
        actions.resetForm();
        actions.setSubmitting(false);
        displayToast();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Flex align="center" justify="center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box mt="20px">
                <FormikControl
                  control="chakraInput"
                  type="name"
                  label="School Name"
                  name="SchoolName"
                />
              </Box>

              <Spacer />
              <Box mt={4} textAlign="center">
                <Button
                  colorScheme="teal"
                  variant="outline"
                  type="submit"
                  disabled={
                    !formik.isValid || logourl === null || formik.isSubmitting
                  }
                  onClick={formik.submitForm}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
      <UploadSchoolImg getfile={getfile} />
    </Flex>
  );
}

export default AddSchool;
