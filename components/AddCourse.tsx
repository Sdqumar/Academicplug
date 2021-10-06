import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Formik/FormikControl";
import firebase from "../config/firebase-config";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import { Box, Button, Typography } from "@material-ui/core";

import UploadInput from "./UploadPdf";
import { useContext } from "react";
import AuthContext from "components/AuthContext";

import toast, { Toaster } from "react-hot-toast";

function AddCourse({ School, Faculty, Department }) {
  let [currentUser] = useContext(AuthContext);
let {displayName,uid} = currentUser


  const [pdfurl, setPdfurl] = useState(null);

  const getfile = (url) => {
    setPdfurl(url);
  };

  const router = useRouter();

  const initialValues = {
    Course: "",
    Code:""
  };
  const validationSchema = Yup.object().shape({
    Course: Yup.mixed().required("Required"),
    Code: Yup.mixed().required("Required"),
  });

  const onSubmit = async (values, actions) => {
    
    const { getAuth } = await import(
      "firebase/auth"
    );
   getAuth(firebase);
   
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import(
      "firebase/storage"
    );

    const Course = values.Course.trim();
    const Code = values.Code.trim();

    actions.setSubmitting(true);
    const path = `${School}/${Faculty}/${Department}/${Course}`;
      
      
    const pdfUpload = await uploadBytes(ref(getStorage(), path), pdfurl);

    const pdfRef = await getDownloadURL(pdfUpload.ref);

    const { doc, setDoc, getFirestore } = await import("firebase/firestore");
    const firestore = getFirestore(firebase);

    await setDoc(
      doc(firestore, "schools", School, "courses", Course.replace(/\s/g, "-").trim()),
      {
        Course,
        Code,
        School,
        Faculty,
        Department,
        pdfRef,
        size:pdfurl.size,
        by: {displayName,uid},
      }
    )
      .then(() => {
        toast.success("Course Added!");
        actions.resetForm();
        actions.setSubmitting(false);
        router.reload();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Course
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"lg"}
        fullWidth={true}
        className="AddDialog"
      >
        <Box
          justifyContent="space-between"
         mt='1rem'
          ml={{
            xs: "10px",
            md: "2rem",
          }}
        >
            <button className="closeBtn" onClick={handleClose}>
            Close
          </button>
          <Typography className="heading">Add Course</Typography>
        
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          mb="2rem"
          m="auto"
          display="flex"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Box>
                  <Form>
                    <Box width="15rem" mt={2}>
                      <FormikControl
                        control="chakraInput"
                        type="name"
                        label="Course Name"
                        name="Course"
                      />
                    </Box>
                    <Box width="15rem" mt={2}>
                      <FormikControl
                        control="chakraInput"
                        type="name"
                        label="Course Code"
                        name="Code"
                      />
                    </Box>
                  </Form>
                  <Box>
                    <UploadInput
                      getfile={getfile}
                      label="pdf"
                      size={{
                        byte: "60000000",
                        mb: "60mb",
                      }}
                      type="application/pdf"
                    />
                  </Box>
                  <Toaster position="top-center" />
                  <Box mt={2} textAlign="center">
                    <Button
                      variant="outlined"
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
        </Box>
      </Dialog>
    </>
  );
}
export default AddCourse;
