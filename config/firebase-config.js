import { initializeApp, } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
// import { enableIndexedDbPersistence,getFirestore } from "firebase/firestore"; 

const config = {
	apiKey: 'AIzaSyBuX9Tg0LK7EnFZGkoXDPwm6mDeKOJyVJE',
	authDomain: 'sdqumar007.firebaseapp.com',
	projectId: 'sdqumar007',
	storageBucket: 'sdqumar007.appspot.com',
	messagingSenderId: '619808274792',
	appId: '1:619808274792:web:6daec642a20eae962abedd',
	measurementId: 'G-EBM1PZ4W6K',
};

    
let firebase = initializeApp(config);
// if (process.browser) {
// 	console.log('this code will only run on the browser')
// 	const firestore = getFirestore(firebase)
// 	// enableIndexedDbPersistence(firestore)
//   }
const firestore = getFirestore(firebase);
// connectFirestoreEmulator(firestore,'localhost',8080)

export default firebase;
