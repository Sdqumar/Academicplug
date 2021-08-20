import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import { Flex, Spacer, Box, Button, useToast, Heading } from "@chakra-ui/react";
import firebase from "../config/firebase-config";
//import PrivateRoute from "../components/PrivateRoute";

const firestore = firebase.firestore();

export async function getStaticProps(context) {
  const schoolref = await firestore.collection("Schools").get();

  const data = schoolref.docs.map((doc) => JSON.stringify(doc.data()));
  const id = schoolref.docs.map((doc) => doc.id);

  return {
    props: {
      data,
      id,
    },
  };
}

function RemoveMaterial(props) {
  const data = props.data.map((i) => JSON.parse(i));
  //select School options code
  let schoolOptions = [];

  props.id.forEach((id) => {
    schoolOptions.push({ key: id, value: id });
  });

  // select faculty option code
  interface values {
    Department?: string;
    School?: string;
    Faculty?: string;
  }
  const [formikValue, setFormikValue] = useState<values>({});
  const [departmentOptions, setdepartmentOptions] = useState([
    { key: "Select your Department", value: "" },
  ]);
  const [courseOptions, setCourseOptions] = useState([
    { key: "Select your Department", value: "" },
  ]);

  // this function is been passed to the render props formik component, which then call it and pass the state of formikvalues like method as props
  const getFormikValue = (formikvalues: values) => {
    setFormikValue(formikvalues);
  };
  const { School, Faculty } = formikValue;
  let facultylOptions = [];
  let departmentlist = [];
  // am using optional chaining to check if Facuties exisits and if if has values
  data.forEach((data) => {
    if (School === data.Name) {
      const list = Object.keys(data).filter(
        (item) => item !== "Name" && item !== "logourl"
      );

      list.forEach((item) => {
        facultylOptions.push({ key: item, value: item });
        if (Faculty === item) {
          data[item].forEach((item2) => {
            departmentlist.push({ key: item2, value: item2 });
          });
        }
      });
    }
  });

  // select department

  // select course code

  const getCourse = async () => {
    const schoolref = await firestore
      .collection("Schools")
      .doc(formikValue?.School)
      .collection("Courses")
      .where("Department", "==", formikValue?.Department)
      .get();
    const courseList = schoolref.docs
      .map((doc) => doc.data())
      .map((item) => item?.Name);

    return courseList;
  };

  let courseList = [];

  useEffect(() => {
    if (formikValue.Department !== "" && formikValue.Department !== undefined) {
      getCourse().then((item) => {
        item.forEach((item) => courseList.push({ key: item, value: item }));
        setCourseOptions(courseList);
      });
    }

    //console.log(courseOptions);
  }, [formikValue.Department]);

  //Clean up the form after changing school
  useEffect(() => {
    setdepartmentOptions([{ key: "Select your Department", value: "" }]);
    facultylOptions = [{ key: "Select your Faculty", value: "" }];
    setCourseOptions([]);
  }, [School]);

  const initialValues = {
    Department: "",
    School: "",
    Faculty: "",
    Course: "",
    Material: "",
  };

  const validationSchema = Yup.object().shape({
    Department: Yup.mixed().required("Required"),
    School: Yup.mixed().required("Required"),
    Faculty: Yup.mixed().required("Required"),
    Course: Yup.mixed().required("Required"),
    Material: Yup.mixed().required("Required"),
  });

  const toast = useToast();

  const displayToast = () => {
    toast({
      title: "Material Deleted",
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const onSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    firestore
      .collection("Schools")
      .doc(School)
      .collection("Courses")
      .doc(values.Name)
      .set({
        ...values,
      })
      .then(() => {
        console.log("Document successfully written!");
        actions.resetForm();
        displayToast();
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  return (
    <Box>
      <Heading size="lg" fontSize="50px" m="1rem">
        Remove Material
      </Heading>
      <Flex align="center" justify="center" m="2rem 0">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            const [formikState, setformikState] = useState({});

            useEffect(() => {
              setformikState(formik.values);
              //this function send formikstate to the upper component like method as props
              getFormikValue(formikState);
            }, [formik]);
            return (
              <Box>
                <Form>
                  <Box>
                    <FormikControl
                      control="Selectoption"
                      label="School"
                      name="School"
                      options={schoolOptions}
                    />
                  </Box>
                  <Box>
                    <FormikControl
                      control="Selectoption"
                      label="Faculty"
                      name="Faculty"
                      options={facultylOptions}
                    />
                  </Box>

                  <Box>
                    <FormikControl
                      control="Selectoption"
                      label="Department"
                      name="Department"
                      options={departmentlist}
                      disabled={departmentOptions.length < 1}
                    />
                  </Box>
                  <Box>
                    <FormikControl
                      control="Selectoption"
                      label="Course"
                      name="Course"
                      options={courseOptions}
                      disabled={courseOptions.length < 1}
                    />
                  </Box>
                  <Box mt="20px">
                    <FormikControl
                      control="Selectoption"
                      type="name"
                      label="Material Name"
                      name="Material"
                      options={departmentlist}
                      disabled={departmentOptions.length < 1}
                    />
                  </Box>

                  <Spacer />
                </Form>
                <Box mt={4} textAlign="center">
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    onClick={formik.submitForm}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            );
          }}
        </Formik>
      </Flex>
    </Box>
  );
}

export default RemoveMaterial;
