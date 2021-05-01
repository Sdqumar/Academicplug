import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import { Flex, Spacer, Box, Button } from "@chakra-ui/react";
import firebase from "../config/firebase-config";
import { initializeApp } from "firebase-admin";


//initialize firestore 
const firestore = firebase.firestore()

export async function getStaticProps(context) {
  const schoolref = await firestore.collection("Schools").get();

  const data = schoolref.docs.map((doc) => doc.data());
  const id = schoolref.docs.map((doc) => doc.id);

  return {
    props: {
      data,
      id,
    },
  };
}

function AddCourse(props) {

  //select School options code
  const schoolOptions = [{ key: "Select your School", value: "" }];

  const getSchoolOptions = props.id.forEach((id) => {
    schoolOptions.push({ key: id, value: id });
  });

  // select faculty option code
interface  values{
  department?: string,
  school?: string,
  faculty?: string,
}

const [formikValue,setFormikValue] = useState<values>({})
// this function is been passed to the render props formik component, which then call it and pass the state of formikvalues like method as props 
const getFormikValue = (formikvalues:values) => {
  setFormikValue(formikvalues)
};

const school = formikValue.school;
const department = formikValue.department;

  const facultylOptions = [{ key: "Select your Faculty", value: "" }];

  props.data.forEach((data) => {
   
    if (formikValue.school === data.Name) {
      data.Facluties.forEach((item) => {
        facultylOptions.push({ key: item, value: item });
      });
    }
  });

  // select department option code

  const [departmentOptions, setdepartmentOptions] = useState([]);
  useEffect(() => {
    if (formikValue.faculty && formikValue.school) {
      const school = formikValue.school;
      const options = [];

      setdepartmentOptions([{ key: "Select your Faculty", value: "" }]);

      firestore
        .collection("Schools")
        .doc(school)
        .collection("Department")
        .get()
        .then((doc) => {
          doc.forEach((item) => {
            options.push({ key: item.id, value: item.id });
          });
          setdepartmentOptions(options);
        });
    }
  }, [formikValue.faculty]);

  const initialValues = {
    department: "",
    school: "",
    faculty: "",
    courseName: "",
  };
  const validationSchema = Yup.object().shape({
    department: Yup.mixed().required("Required"),
    school: Yup.mixed().required("Required"),
    faculty: Yup.mixed().required("Required"),
    courseName: Yup.mixed().required("Required"),
  });

  const onSubmit = (values,actions) => {

    firestore.collection("Schools")
    .doc(school)
    .collection("Department")
    .doc(department)
    
    .update({Cources: firebase.firestore.FieldValue.arrayUnion(values.courseName)})
      .then(() => {
          console.log("Document successfully written!");
          actions.resetForm()
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
  };

  
  return (
    <Flex align="center" justify="center" >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
         
         const [formikState, setformikState] = useState({});
            //this function send formikstate to the upper component like method as props
         useEffect(() => {
            setformikState(formik.values);
            getFormikValue(formikState);
          }, [formik]);

          
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
              <Box>
                <FormikControl
                  control="Selectoption"
                  label="Faculty"
                  name="faculty"
                  options={facultylOptions}
                />
              </Box>

              <Box>
                <FormikControl
                  control="Selectoption"
                  label="Department"
                  name="department"
                  options={departmentOptions}
                  disabled={departmentOptions.length < 2}
                />
              </Box>
              <Box mt="20px">
                <FormikControl
                  //control='input'
                  control="chakraInput"
                  type="name"
                  label="Course Name"
                  name="courseName"
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

export default AddCourse;
