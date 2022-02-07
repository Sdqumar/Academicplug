import firebase from "../../config/firebase-config";

export const handleAction = async (action, selectedFlatRows) => {
  const values = selectedFlatRows.map((row) => row.original);
  const { doc, getFirestore, updateDoc, deleteDoc } = await import(
    "firebase/firestore"
  );
  const db = getFirestore(firebase);

  const docRefs = [];

  values.forEach((item) => {
    const docRef = doc(
      db,
      "schools",
      item.School.replace(/\s/g, "-"),
      "courses",
      item.Course.replace(/\s/g, "-")
    );
    docRefs.push(docRef);
  });
try {
    if (action === "delete") {
        Promise.all(
          docRefs.map((docRef) => {
            deleteDoc(docRef);
          })
        );
      }
      if (action != "delete") {
        Promise.all(
          docRefs.map((docRef) => {
            updateDoc(docRef, {
              Approve: action,
            });
          })
        );
      }
      return "success"
} catch (error) {
    console.log(error);
    return "error"
    
}
  
};


