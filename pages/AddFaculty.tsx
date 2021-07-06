import React, { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import { Flex, Spacer, Box, Button } from "@chakra-ui/react";
import firebase from "../config/firebase-config";

//initialize firestore
const firestore = firebase.firestore();

export async function getStaticProps(context) {
  const dataref = await firestore.collection("Schools").get();

  const data = dataref.docs.map((doc) => doc.data());
  const id = dataref.docs.map((doc) => doc.id);
  return {
    props: {
      data,
      id,
    },
  };
}

function AddFaculty(props) {
  let schoolOptions = [];
  const getSchoolOptions = props.id.forEach((id) => {
    schoolOptions.push({ key: id, value: id });
  });

 

  interface values {
    school?: string;
    faculty?: string;
  }
 
  

  const initialValues = {
    school: "",
    faculty: "",
  };

  const validationSchema = Yup.object().shape({
    faculty: Yup.mixed().required("Required"),
    school: Yup.mixed().required("Required"),
  });
  console.log(props.data)
  const onSubmit = (values,actions) => {
      console.log(values)
    const {school,faculty} = values;
    
    //created a new courses array to the database for future adding of courses into the array 
    const Courses = []
    firestore
      .collection("Schools")
      .doc(school)
      .update({ Facluties: firebase.firestore.FieldValue.arrayUnion({Name:faculty, Department:[]})})
      .then(() => {
        console.log("Document successfully written!")
        actions.resetForm()
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Flex align="center" justify="center" h="50vw">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          
          return (
            <Form>
              <Box>
                <FormikControl
                  control="Selectoption"
                  label="School"
                  name="school"
                  options={schoolOptions}
                />
              </Box>
           
              <Box mt="20px">
                <FormikControl
                  control="chakraInput"
                  type="name"
                  label="Faculty Name"
                  name="faculty"
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

export default AddFaculty;
