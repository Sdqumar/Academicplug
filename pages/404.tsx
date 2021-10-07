import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";

const notFound =()=>{
        const router=  useRouter()

    const home= ()=>{
      router.push('/')
    }
    return(
        <Box textAlign='center'>
            <h2>404!</h2>
            <p>Page Not Found </p>
            <Button variant='outlined' onClick={home}>Home</Button>
            </Box>
    )}

export default notFound