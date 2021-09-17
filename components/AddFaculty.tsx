import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from './Formik/FormikControl';
import firebase from '../config/firebase-config';
import {Box, Button, Typography} from '@material-ui/core';
import toast, {Toaster} from 'react-hot-toast';
import Dialog from '@material-ui/core/Dialog';
import React, {useState} from 'react';

function AddFaculty({school}) {
    const initialValues = {
        faculty: ''
    };

    const validationSchema = Yup.object().shape({faculty: Yup.mixed().required('Required')});

    const onSubmit = async (values, actions) => {
        actions.setSubmitting(true);

        const {doc, setDoc, getFirestore} = await import ('firebase/firestore');
        const firestore = getFirestore(firebase);

        const faculty = values.faculty.trim();

        setDoc(doc(firestore, 'schools', school, 'faculty', faculty), {
            name: faculty,
            department: []
        }).then(() => {
            toast.success('Faculty Added!');

            actions.resetForm();
            actions.setSubmitting(false);
        }).catch((error) => {
            console.error('Error writing document: ', error);
        });
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button variant="outlined"
                onClick={handleClickOpen}>
                Add Faculty
            </Button>
            <Dialog open={open}
                onClose={handleClose}
                maxWidth={'lg'}
                fullWidth={true}
                className='AddDialog'>
                <Box justifyContent="space-between" mt="1rem"
                    ml={
                        {
                            xs: '10px',
                            md: '2rem'
                        }
                }>
                    <Typography className="heading">Add Faculty</Typography>
                    <button className='closeBtn'
                        onClick={handleClose}>
                        Close
                    </button>
                </Box>
                <Box alignItems="center" justifyContent="center" mb="2rem" m="auto" display="flex">
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                        {
                        (formik) => {
                            return (
                                <Form>
                                    <Box mt="20px">
                                        <FormikControl control="chakraInput" type="name" label="Faculty Name" name="faculty"/>
                                    </Box>
                                    <Toaster position="top-center"/>

                                    <Box mt={2}
                                        textAlign="center">
                                        <Button variant="outlined" type="submit"
                                            disabled={
                                                !formik.isValid
                                        }>
                                            Submit
                                        </Button>
                                    </Box>
                                </Form>
                            );
                        }
                    } </Formik>
                </Box>

            </Dialog>
        </>

    );
}

export default AddFaculty;
