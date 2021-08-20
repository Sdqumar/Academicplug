import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import { Flex, Spacer, Box, Button, useToast, Heading } from "@chakra-ui/react";
import firebase from "../config/firebase-config";
import PrivateRoute from "../components/PrivateRoute";

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

function AddDepartment(props) {
  let schoolOptions = [];

  const getSchoolOptions = props.id.forEach((id) => {
    schoolOptions.push({ key: id, value: id });
  });

  interface values {
    departmentName?: string;
    school?: string;
    faculty?: string;
  }
  const [formikValue, setFormikValue] = useState<values>({});
  // this function is been passed to the render props formik component, which then call it and pass the state of formikvalues like method as props

  const getFormikValue = (value: values) => {
    setFormikValue(value);
  };

  let facultylOptions = [];
  props.data.forEach((data) => {
    if (formikValue.school === data.Name) {
      const list = Object.keys(data).filter(
        (item) => item !== "Name" && item !== "logourl"
      );

      list.forEach((item) => {
        facultylOptions.push({ key: item, value: item });
      });
    }
  });

  const initialValues = {
    departmentName: "",
    school: "",
    faculty: "",
  };
  const validationSchema = Yup.object().shape({
    departmentName: Yup.mixed().required("Required"),
  });

  const toast = useToast();
  const displayToast = () => {
    toast({
      title: "Department Added Successfully",
      position: "top",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  const onSubmit = (values, actions) => {
    const { school, faculty, departmentName } = values;
    //created a new courses array to the database for future adding of courses into the array

    firestore
      .collection("Schools")
      .doc(school)
      .update({
        [faculty]: firebase.firestore.FieldValue.arrayUnion(departmentName),
      })
      .then(() => {
        displayToast();
        actions.resetForm();
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      <Heading size="lg" fontSize="50px" m="1rem">
        Add Department
      </Heading>
      <Flex align="center" justify="center" h="50vw">
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
                <Box mt="20px">
                  <FormikControl
                    //control='input'
                    control="chakraInput"
                    type="name"
                    label="Department Name"
                    name="departmentName"
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
    </>
  );
}

export default PrivateRoute(AddDepartment);
