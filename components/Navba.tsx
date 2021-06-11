import Link from 'next/link'

export interface NavbarProps {
    
}
 
const Navbar: React.FC<NavbarProps> = ({children}) => {
    return ( 
       <div>
           <nav>
            
            <Link href='/'><span>Home</span></Link>
            <Link href='/school'><span>School</span></Link>
            <Link href='/school/department'><span>Department</span></Link>
        </nav>
        <div>
            {children}
        </div>
       </div> 
     );
}
 
export default Navbar;