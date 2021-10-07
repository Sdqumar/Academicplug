import { Box, Button } from "@material-ui/core";
import { useRouter } from "next/router";

const offline =()=>{
        const router=  useRouter()

    const reload= ()=>{
      router.reload()
    }
    return(
        <Box textAlign='center'>
            <h2>No Internet Connection</h2>
            <p>check your conntection </p>
            <Button variant='outlined' onClick={reload}>Retry</Button>
            </Box>

    )
}

export default offline
