import firebase from '../../config/firebase-config';

export const handleAction = async (action,selectedFlatRows) => {
    const values = selectedFlatRows.map((row) => row.original);
    const { doc, deleteDoc, getFirestore } = await import('firebase/firestore');
    const firestore = getFirestore(firebase);

    console.log(values);
    
    // const docRef = await doc(
    //     firestore,
    //     'schools',
    //     school.replace(/\s/g, '-'),
    //     'courses',
    //     course.replace(/\s/g, '-')
    // );

    // deleteDoc(docRef)
    //     .then(() => {
    //         setTimeout(() => router.back(), 1500);
    //         toast.success('Material Removed Sucessful!');
    //     })
    //     .catch((error) => {
    //         console.error('Error removing document: ', error);
    //     });
if(action === 'delete'){
    console.log('is delete');
    
}
if(action != 'delete'){
console.log(action);
    
}
};
