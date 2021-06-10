<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import { Flex, Spacer, Box, Button } from "@chakra-ui/react";
import firebase from "../config/firebase-config";
import UploadInput from "../components/UploadPdf";

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

function AddMaterial(props) {

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


  const facultylOptions = [{ key: "Select your Faculty", value: "" }];

  props.data.forEach((data) => {
    
    if (formikValue.school === data.Name) {
      data.Facluties.forEach((item) => {
        facultylOptions.push({ key: item, value: item });
      });
    }
  });

  // select department and course option code

  const [departmentOptions, setdepartmentOptions] = useState([]);
  const [courseOptions, setcourseOptions] = useState([]);
  const school = formikValue.school;
  const department = formikValue.department;


  useEffect(() => {
    if (formikValue.faculty && formikValue.school) {
      
      const options = [];
      const getcourseoptions = [];

      setdepartmentOptions([{ key: "Select your Department", value: "" }]);
      setcourseOptions([{ key: "Select your Course", value: "" }]);

      firestore
        .collection("Schools")
        .doc(school)
        .collection("Department")
        .get()
        .then((doc) => {
          doc.forEach((item) => {
            if(item.data().Cources){
            const courseitem = item.data().Cources.forEach(course=>{
                getcourseoptions.push({ key: course, value: course });
            })
            }  
            options.push({ key: item.id, value: item.id });
          });
          setdepartmentOptions(options);
          setcourseOptions(getcourseoptions)
        });
    }
  }, [formikValue.faculty]);

  const initialValues = {
    department: "",
    school: "",
    faculty: "",
    courseName: "",
    material:"",
  };
  const validationSchema = Yup.object().shape({
    department: Yup.mixed().required("Required"),
    school: Yup.mixed().required("Required"),
    faculty: Yup.mixed().required("Required"),
    courseName: Yup.mixed().required("Required"),
  });

  const onSubmit = async (values,actions) => {
    
       firestore.collection("Schools")
      .doc(school)
      .collection("Department")
      .doc(department)
      .collection('Courses')
      .add({
          ...values,
          pdfurl,
           createdAt: new Date()
        })
        .then(() => {
            console.log("Document successfully written!")
            actions.resetForm()
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        
        
       
  };
    const [pdfurl,setPdfurl] = useState(null)
  const getfile= (url) =>{
        setPdfurl(url)
        
  }
  return (
    <Flex align="center" justify="center" >
      
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
              <Box>
                <FormikControl
                  control="Selectoption"
                  label="Course"
                  name="courseName"
                  options={courseOptions}
                  disabled={departmentOptions.length < 2}
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
            <UploadInput getfile={getfile} formik={formik.values}/>
            <Box mt={4} textAlign="center">
                <Button
                  colorScheme="teal"
                  variant="outline"
                  type="submit"
                  disabled={pdfurl ===null  && !formik.isValid }
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
=======
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
    school?: string;
    faculty?: string;
  }
  const [formikValue, setFormikValue] = useState<values>({});

  // this function is been passed to the render props formik component, which then call it and pass the state of formikvalues like method as props
  const getFormikValue = (formikvalues: values) => {
    setFormikValue(formikvalues);
  };
  const school = formikValue.school;
  const department = formikValue.department;

  let facultylOptions = [];
// am using optional chaining to check if Facuties exisits and if if has values
  data.forEach((data) => {
    if (school === data.Name) {
      data?.Facluties?.forEach((item) => {
        facultylOptions.push({ key: item, value: item });
      });
    }
  });

  // select department and course option code

  const [departmentOptions, setdepartmentOptions] = useState([
    { key: "Select your Department", value: "" },
  ]);
  const [courseOptions, setcourseOptions] = useState([
    { key: "Select your Course", value: "" },
  ]);
 

  useEffect(() => {
    if (formikValue.faculty && formikValue.school) {
      const options = [];
      const getcourseoptions = [];

     
      firestore
        .collection("Schools")
        .doc(school)
        .collection("Department")
        .where("Faculty", "==", formikValue.faculty)
        .get()
        .then((doc) => {
          doc.forEach((item) => {
            if (item.data().Cources) {
              const courseitem = item.data().Cources.forEach((course) => {
                getcourseoptions.push({ key: course, value: course });
              });
            }
            options.push({ key: item.id, value: item.id });
          });
          setdepartmentOptions(options);
          setcourseOptions(getcourseoptions);
        });
    }
  }, [formikValue.faculty]);

  const initialValues = {
    department: "",
    school: "",
    faculty: "",
    courseName: "",
    material: "",
  };
  const validationSchema = Yup.object().shape({
    department: Yup.mixed().required("Required"),
    school: Yup.mixed().required("Required"),
    faculty: Yup.mixed().required("Required"),
    courseName: Yup.mixed().required("Required"),
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
      .doc(school)
      .collection("Department")
      .doc(department)
      .collection("Courses")
      .add({
        ...values,
        pdfurl,
        createdAt: new Date(),
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
                <Box>
                  <FormikControl
                    control="Selectoption"
                    label="Course"
                    name="courseName"
                    options={courseOptions}
                    disabled={departmentOptions.length < 2}
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
                {console.log(formik.isSubmitting)}
              </Box>
            </Box>
          );
        }}
      </Formik>
    </Flex>
  );
}

export default AddMaterial;
>>>>>>> master
