import { useState } from "react";
import firebase from "../config/firebase-config";

import { Flex, Button, Input, FormControl, FormLabel,Box } from "@chakra-ui/react";

const UploadInput = ({getfile,formik}) => {
  
  const [file, setFile] = useState({});
  const [error, seterror] = useState<string | boolean>("");
  const [fileTemp, setFileTemp] = useState("");

  interface e {
    target: { files: [] | {} };
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const storageRef = firebase.storage().ref();
     const fileRef = storageRef.child(`${formik.school}/${formik.material}`);
     await fileRef.put(file);
     const url = await fileRef.getDownloadURL();
     url && console.log(url);
     getfile(url);

  };

  
  const handleFile = (e: e) => {
    const file = e.target.files[0];
    seterror("Please Upload a pdf file");
    setFileTemp(null)
    setFile(null);
    setFile(null);
    if(file === undefined){
      seterror("Please Upload a pdf file");
    } else if (file.type != "application/pdf") {
      seterror("Please Upload a pdf file");


    } else if (file.size > 100253998) {
      seterror("Upload file less than 10MB file");

    } else {
      seterror(false);
      setFile(file);
      setFileTemp(URL.createObjectURL(e.target.files[0]));

    }
  };
  return (
    
    <Flex w="300px" ml="10">
         
      <FormControl isRequired  >
        <form onSubmit={onSubmit}>
          <FormLabel>Upload pdf</FormLabel>
          <Box d='flex'  alignItems='center'>
          <Input
            isRequired
            type="file"
            label="File"
            name="file"
            onChange={handleFile}
          />
            <Button
            type="submit"
            colorScheme="teal"
            variant="outline"
            m="auto"
            ml="5"
            disabled={!formik.material || error} 

          >
            upload
          </Button>
          </Box>
          {fileTemp && 
          <a href={fileTemp} target='_blank'>Click to preview</a>
          }
          {error && <p>{error}</p>}
        
        </form>
      </FormControl>
    </Flex>
  );
};

export default UploadInput;
