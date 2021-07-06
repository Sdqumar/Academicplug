import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import { Flex, Spacer, Box, Button, Grid } from "@chakra-ui/react";
import firebase from "../config/firebase-config";
import UploadSchoolImg from "../components/UploadSchoolImg";

//initialize firestore
const firestore = firebase.firestore();



function AddSchool() {

  const initialValues = {
    SchoolName: '',
  };

  const validationSchema = Yup.object().shape({
    SchoolName: Yup.mixed().required("Required"),
  });
  
  const [logourl,setLogourl] = useState(null)
  const getfile= (url) =>{
    setLogourl(url)
  }

  const onSubmit = (values,actions) => {
    const school = values.SchoolName;
    //created a new courses array to the database for future adding of courses into the array 
    const Courses = []
    firestore
      .collection("Schools")
      .doc(school)
      .set({
        logourl,
        Name:school,
        Facluties:[]
      })
      .then(() => {
        console.log("Document successfully written!")
        actions.resetForm()
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  

  return (
    <Grid align="center" justify="center" w='300px' m='auto'>
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
                  disabled={!formik.isValid || logourl ===null}
                  onClick={formik.submitForm}
                  
                >
                  Submit
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
      <UploadSchoolImg getfile={getfile}/>
    </Grid>
  );
}

export default AddSchool;
