import React, { useEffect, useRef, useState } from "react";
import { Formik, Form,  } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import { Flex, Spacer, Box, Button, useToast } from "@chakra-ui/react";
import firebase from "../config/firebase-config";
import UploadInput from "../components/UploadPdf";

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

function AddMaterial(props) {
  const data = props.data.map((i) => JSON.parse(i));
  //select School options code
  let schoolOptions = [];

  props.id.forEach((id) => {
    schoolOptions.push({ key: id, value: id });
  });

  // select faculty option code
  interface values {
    department?: string;
    School?: string;
    Faculty?: string;
  }
  const [formikValue, setFormikValue] = useState<values>({});

  // this function is been passed to the render props formik component, which then call it and pass the state of formikvalues like method as props
  const getFormikValue = (formikvalues: values) => {
    setFormikValue(formikvalues);
  };
  const {School,Faculty,} = formikValue;
  let facultylOptions = [];
// am using optional chaining to check if Facuties exisits and if if has values
  data.forEach((data) => {
    if (School === data.Name) {
      data?.Facluties?.forEach((item) => {
        facultylOptions.push({ key: item.Name, value: item.Name });
      });
    }
  });

  // select department and course option code

  const [departmentOptions, setdepartmentOptions] = useState([
    { key: "Select your Department", value: "" },
  ]);

  useEffect(() => {
    setdepartmentOptions([{ key: "Select your Department", value: "" }])
    facultylOptions = []
    
  }, [School]);

  useEffect(() => {
   
    if (Faculty && School) {
      const options = [];
      setdepartmentOptions(options)
    facultylOptions = []
      data.forEach((data) => {
        if (School === data.Name) {
          data?.Facluties?.forEach((item) => {
           if (Faculty === item?.Name ){
              item?.Department?.forEach(department=>{
                options.push({key: department, value: department})
              })
           }
          });
        }
        setdepartmentOptions(options)

      });
     
    }
  }, [Faculty]);

  const initialValues = {
    Department: "",
    School: "",
    Faculty: "",
    Name: "",
    material: "",
  };
  const validationSchema = Yup.object().shape({
    Department: Yup.mixed().required("Required"),
    School: Yup.mixed().required("Required"),
    Faculty: Yup.mixed().required("Required"),
    Name: Yup.mixed().required("Required"),
    material: Yup.mixed().required("Required"),
  });

  const toast = useToast();

  const displayToast = () => {
    toast({
      title: "Material created",
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
        pdfurl,
      })
      .then(() => {
        console.log("Document successfully written!");
        actions.resetForm();
        displayToast();
        actions.setSubmitting(false)
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  const [pdfurl, setPdfurl] = useState(null);
  const getfile = (url) => {
    setPdfurl(url);
  };
  return (
    <Flex align="center" justify="center">
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
                    options={departmentOptions}
                    disabled={departmentOptions.length < 2}
                  />
                </Box>
                <Box>
                  <FormikControl
                    control="chakraInput"
                    label="Course"
                    name="Name"
                    
                  />
                </Box>
                <Box mt="20px">
                  <FormikControl
                    control="chakraInput"
                    type="name"
                    label="Material Name"
                    name="material"
                  />
                </Box>

                <Spacer />
              </Form>
              <UploadInput getfile={getfile} formik={formik.values} />
              <Box mt={4} textAlign="center">
                <Button
                  colorScheme="teal"
                  variant="outline"
                  type="submit"
                  disabled={
                    pdfurl === null ||
                    !formik.isValid ||
                    formik.isSubmitting 
                  }
                  onClick={formik.submitForm}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          );
        }}
      </Formik>
    </Flex>
  );
}

export default AddMaterial;
