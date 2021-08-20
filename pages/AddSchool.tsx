import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import {
  Flex,
  Spacer,
  Box,
  Button,
  Grid,
  useToast,
  Heading,
} from "@chakra-ui/react";
import firebase from "../config/firebase-config";
import UploadSchoolImg from "../components/UploadSchoolImg";
//import PrivateRoute from "../components/PrivateRoute";
import { useRouter } from "next/router";

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
      duration: 2000,
      isClosable: true,
    });
  };

  const router = useRouter();

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
      })
      .then(() => {
        actions.resetForm();
        displayToast();
        actions.setSubmitting(false);
        router.reload();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      <Heading size="lg" fontSize="50px" m="1rem">
        Add School
      </Heading>
      <Grid align="center" justify="center" w="300px" m="auto" mb="10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <>
                <Form>
                  <Box m="10px 0">
                    <FormikControl
                      control="chakraInput"
                      type="name"
                      label="School Name"
                      name="SchoolName"
                    />
                  </Box>
                </Form>
                <Spacer />

                <UploadSchoolImg
                  getfile={getfile}
                  formik={formik.values.SchoolName}
                />
                <Box mt={4} textAlign="center">
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={formik.submitForm}
                    type="submit"
                    disabled={!formik.isValid || logourl === null}
                  >
                    Submit
                  </Button>
                </Box>
              </>
            );
          }}
        </Formik>
      </Grid>
    </>
  );
}

export default AddSchool;
