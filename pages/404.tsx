import Link from "next/link"

export interface notFoundProps {
    
}
 
const notFound: React.SFC<notFoundProps> = () => {
    return ( 
        <div>
            <h1>Oooops Wrong page</h1>
            <div>
                Go back to <Link href='/'><a>Homepage</a></Link>
            </div>
        </div>
     );
}
 
export default notFound;