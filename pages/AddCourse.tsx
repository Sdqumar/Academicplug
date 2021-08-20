import React, { useEffect, useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import FormikControl from "../components/Formik/FormikControl";
// import { Flex, Spacer, Box, Button } from "@chakra-ui/react";
// import firebase from "../config/firebase-config";
// import { useRouter } from "next/router";
import PrivateRoute from "../components/PrivateRoute";

// //initialize firestore
// const firestore = firebase.firestore();

// export async function getServerSideProps(context) {
//   const schoolref = await firestore.collection("Schools").get();

//   const data = schoolref.docs.map((doc) => doc.data());
//   const id = schoolref.docs.map((doc) => doc.id);

//   return {
//     props: {
//       data,
//       id,
//     },
//   };
// }

function AddCourse(props) {
  // const router = useRouter();
  // const data = props.data.map((i) => i);

  // //select School options code
  // const schoolOptions = [{ key: "Select your School", value: "" }];

  // const getSchoolOptions = props.id.forEach((id) => {
  //   schoolOptions.push({ key: id, value: id });
  // });

  // // select faculty option code
  // interface values {
  //   department?: string;
  //   school?: string;
  //   faculty?: string;
  // }

  // const [formikValue, setFormikValue] = useState<values>({});
  // // this function is been passed to the render props formik component, which then call it and pass the state of formikvalues like method as props
  // const getFormikValue = (formikvalues: values) => {
  //   setFormikValue(formikvalues);
  // };

  // const { school, faculty } = formikValue;
  // let facultylOptions = [];
  // let departmentlist = [];
  // // am using optional chaining to check if Facuties exisits and if if has values
  // data.forEach((data) => {
  //   if (school === data.Name) {
  //     const list = Object.keys(data).filter(
  //       (item) => item !== "Name" && item !== "logourl"
  //     );

  //     list.forEach((item) => {
  //       facultylOptions.push({ key: item, value: item });
  //       if (faculty === item) {
  //         data[item].forEach((item2) => {
  //           departmentlist.push({ key: item2, value: item2 });
  //         });
  //       }
  //     });
  //   }
  // });

  // const initialValues = {
  //   department: "",
  //   school: "",
  //   faculty: "",
  //   course: "",
  // };
  // const validationSchema = Yup.object().shape({
  //   department: Yup.mixed().required("Required"),
  //   school: Yup.mixed().required("Required"),
  //   faculty: Yup.mixed().required("Required"),
  //   course: Yup.mixed().required("Required"),
  // });

  // const onSubmit = (values, actions) => {
  //   const course = { Name: values.courseName };
  //   firestore
  //     .collection("Schools")
  //     .doc(school)
  //     .collection("Department")
  //     .doc(department)

  //     .update({ Cources: firebase.firestore.FieldValue.arrayUnion(course) })
  //     .then(() => {
  //       console.log("Document successfully written!");
  //       actions.resetForm();
  //     })
  //     .catch((error) => {
  //       console.error("Error writing document: ", error);
  //     });
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
    //       //this function send formikstate to the upper component like method as props

    //       useEffect(() => {
    //         setformikState(formik.values);
    //         getFormikValue(formikState);
    //       }, [formik]);

    //       return (
    //         <Form>
    //           <Box>
    //             <FormikControl
    //               control="Selectoption"
    //               label="School"
    //               name="school"
    //               options={schoolOptions}
    //             />
    //           </Box>
    //           <Box>
    //             <FormikControl
    //               control="Selectoption"
    //               label="Faculty"
    //               name="faculty"
    //               options={facultylOptions}
    //             />
    //           </Box>

    //           <Box>
    //             <FormikControl
    //               control="Selectoption"
    //               label="Department"
    //               name="department"
    //               options={departmentlist}
    //               disabled={departmentlist.length < 1}
    //             />
    //           </Box>
    //           <Box mt="20px">
    //             <FormikControl
    //               control="Selectoption"
    //               label="Course"
    //               name="course"
    //               options={courseOptions}
    //             />
    //           </Box>

    //           <Spacer />
    //           <Box mt={4} textAlign="center">
    //             <Button
    //               colorScheme="teal"
    //               variant="outline"
    //               type="submit"
    //               disabled={!formik.isValid}
    //             >
    //               Submit
    //             </Button>
    //           </Box>
    //         </Form>
    //       );
    //     }}
    //   </Formik>
    // </Flex>
  );
}
export default PrivateRoute(AddCourse);
