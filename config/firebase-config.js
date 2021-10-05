import { initializeApp } from 'firebase/app';

const config = {
	apiKey: 'AIzaSyBuX9Tg0LK7EnFZGkoXDPwm6mDeKOJyVJE',
	authDomain: 'sdqumar007.firebaseapp.com',
	projectId: 'sdqumar007',
	storageBucket: 'sdqumar007.appspot.com',
	messagingSenderId: '619808274792',
	appId: '1:619808274792:web:6daec642a20eae962abedd',
	measurementId: 'G-EBM1PZ4W6K',
};

    
// connectFirestoreEmulator(firestore,'http://localhost:4000/',8080)
  
let firebase = initializeApp(config);
export default firebase;
