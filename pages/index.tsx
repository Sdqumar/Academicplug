import Link from 'next/link'
import firebase from '../config/firebase-config';

 export async function getStaticProps(context){
 
  const dataref = await firebase.firestore().collection('Schools').get()

  const data = dataref.docs.map(doc=> doc.data()) 
  const id = dataref.docs.map(doc=> doc.id) 

  return {
    props: {
      data,
      id
    },
  }
}
export default  function Home(props) {
  console.log(props)
  
  return (
    <div>
        <h1>Homepage </h1>
        {}       
    </div>
  )
}
