import {firestore}from "@/config/firebaseNode"
export default  async function handler(req, res) {
  try {
   const schools = await firestore.collection("schools").get()
    const data = schools.docs.map((school)=>school.data()
   )
    res.status(200).json(data);
  
  } catch (error) {
    console.error(error);

    res.status(500).json({ data: error });
  }
}
