import firebase from "../config/firebase-config";

const Index = () => {
(async()=>{
    const { getDocs, getFirestore, collection, } = await import(
        "firebase/firestore"
      );
      const firestore = await getFirestore(firebase);
    
      const q = await getDocs(collection(firestore, "schools"));
      const data = q.docs.map((doc) => doc.data());
}
)()
    
    
  return (
    <>
    <h1>kjdjsklj</h1>
    </>
  );
};

export default Index;
