// import React, { useEffect, useRef, useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import FormikControl from "../components/Formik/FormikControl";
// import { Flex, Spacer, Box, Button, useToast } from "@chakra-ui/react";
// import firebase from "../config/firebase-config";
// import UploadInput from "../components/UploadPdf";
// import { useRouter } from "next/router";
import PrivateRoute from "../components/PrivateRoute";

// const firestore = firebase.firestore();

// export async function getStaticProps(context) {
//   const schoolref = await firestore.collection("Schools").get();

//   const data = schoolref.docs.map((doc) => JSON.stringify(doc.data()));
//   const id = schoolref.docs.map((doc) => doc.id);

//   return {
//     props: {
//       data,
//       id,
//     },
//   };
// }

function AddMaterial(props) {
  // const data = props.data.map((i) => JSON.parse(i));
  // //select School options code
  // let schoolOptions = [];

  // props.id.forEach((id) => {
  //   schoolOptions.push({ key: id, value: id });
  // });

  // // select faculty option code
  // interface values {
  //   Department?: string;
  //   School?: string;
  //   Faculty?: string;
  //   Course?: string;
  // }
  // const [formikValue, setFormikValue] = useState<values>({});

  // // this function is been passed to the render props formik component, which then call it and pass the state of formikvalues like method as props
  // const getFormikValue = (formikvalues: values) => {
  //   setFormikValue(formikvalues);
  // };
  // const [departmentOptions, setdepartmentOptions] = useState([
  //   { key: "Select your Department", value: "" },
  // ]);

  // const { School, Faculty } = formikValue;
  // let facultylOptions = [];
  // let departmentlist = [];
  // // am using optional chaining to check if Facuties exisits and if if has values
  // data.forEach((data) => {
  //   if (School === data.Name) {
  //     const list = Object.keys(data).filter(
  //       (item) => item !== "Name" && item !== "logourl"
  //     );

  //     list.forEach((item) => {
  //       facultylOptions.push({ key: item, value: item });
  //       if (Faculty === item) {
  //         data[item].forEach((item2) => {
  //           departmentlist.push({ key: item2, value: item2 });
  //         });
  //       }
  //     });
  //   }
  // });

  // // select department option code

  // const getCourse = async () => {
  //   const schoolref = await firestore
  //     .collection("Schools")
  //     .doc(formikValue?.School)
  //     .collection("Courses")
  //     .where("Department", "==", formikValue?.Department)
  //     .get();
  //   const courseList = schoolref.docs
  //     .map((doc) => doc.data())
  //     .map((item) => item?.Name);

  //   return courseList;
  // };
  // const [courseOptions, setCourseOptions] = useState([]);
  // let courseList = [];

  // useEffect(() => {
  //   if (formikValue.Department !== "" && formikValue.Department !== undefined) {
  //     getCourse().then(async (item) => {
  //       item.forEach((item) => courseList.push({ key: item, value: item }));
  //     });
  //     setCourseOptions(courseList);
  //   }
  // }, [
  //   formikValue.Department,
  //   formikValue.Faculty,
  //   formikValue.School,
  //   formikValue.Course,
  // ]);
  // // select department and course option code

  // useEffect(() => {
  //   setdepartmentOptions([{ key: "Select your Department", value: "" }]);
  //   facultylOptions = [];
  // }, [School]);

  // const initialValues = {
  //   Department: "",
  //   School: "",
  //   Faculty: "",
  //   Course: "",
  //   material: "",
  // };
  // const validationSchema = Yup.object().shape({
  //   Department: Yup.mixed().required("Required"),
  //   School: Yup.mixed().required("Required"),
  //   Faculty: Yup.mixed().required("Required"),
  //   Course: Yup.mixed().required("Required"),
  //   material: Yup.mixed().required("Required"),
  // });

  // const toast = useToast();

  // const displayToast = () => {
  //   toast({
  //     title: "Material created",
  //     position: "top",
  //     status: "success",
  //     duration: 2000,
  //     isClosable: true,
  //   });
  // };
  // const router = useRouter();

  // const onSubmit = async (values, actions) => {
  //   actions.setSubmitting(true);

  //   firestore
  //     .collection("Schools")
  //     .doc(School)
  //     .collection("Courses")
  //     .doc(values.Name)
  //     .set({
  //       ...values,
  //       pdfurl,
  //     })
  //     .then(() => {
  //       console.log("Document successfully written!");
  //       actions.resetForm();
  //       displayToast();
  //       actions.setSubmitting(false);
  //       setTimeout(() => router.reload(), 2500);
  //     })
  //     .catch((error) => {
  //       console.error("Error writing document: ", error);
  //     });
  // };
  // const [pdfurl, setPdfurl] = useState(null);
  // const getfile = (url) => {
  //   setPdfurl(url);
  // };
  return (
    <></>
    // <Flex align="center" justify="center" m="2rem 0">
    //   <Formik
    //     initialValues={initialValues}
    //     validationSchema={validationSchema}
    //     onSubmit={onSubmit}
    //   >
    //     {(formik) => {
    //       const [formikState, setformikState] = useState({});

    //       useEffect(() => {
    //         setformikState(formik.values);
    //         //this function send formikstate to the upper component like method as props
    //         getFormikValue(formikState);
    //       }, [formik]);
    //       return (
    //         <Box>
    //           <Form>
    //             <Box>
    //               <FormikControl
    //                 control="Selectoption"
    //                 label="School"
    //                 name="School"
    //                 options={schoolOptions}
    //               />
    //             </Box>
    //             <Box>
    //               <FormikControl
    //                 control="Selectoption"
    //                 label="Faculty"
    //                 name="Faculty"
    //                 options={facultylOptions}
    //               />
    //             </Box>

    //             <Box>
    //               <FormikControl
    //                 control="Selectoption"
    //                 label="Department"
    //                 name="Department"
    //                 options={departmentlist}
    //                 disabled={departmentOptions.length < 1}
    //               />
    //             </Box>
    //             <Box>
    //               <FormikControl
    //                 control="Selectoption"
    //                 label="Course"
    //                 name="course"
    //                 options={courseOptions}
    //                 disabled={courseOptions.length < 1}
    //               />
    //             </Box>
    //             <Box mt="20px">
    //               <FormikControl
    //                 control="chakraInput"
    //                 type="name"
    //                 label="Material Name"
    //                 name="material"
    //               />
    //             </Box>

    //             <Spacer />
    //           </Form>
    //           <UploadInput getfile={getfile} formik={formik.values} />
    //           <Box mt={4} textAlign="center">
    //             <Button
    //               colorScheme="teal"
    //               variant="outline"
    //               type="submit"
    //               disabled={
    //                 pdfurl === null || !formik.isValid || formik.isSubmitting
    //               }
    //               onClick={formik.submitForm}
    //             >
    //               Submit
    //             </Button>
    //           </Box>
    //         </Box>
    //       );
    //     }}
    //   </Formik>
    // </Flex>
  );
}

export default PrivateRoute(AddMaterial);
