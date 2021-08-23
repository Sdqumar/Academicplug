import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
	apiKey: 'AIzaSyBuX9Tg0LK7EnFZGkoXDPwm6mDeKOJyVJE',
	authDomain: 'sdqumar007.firebaseapp.com',
	projectId: 'sdqumar007',
	storageBucket: 'sdqumar007.appspot.com',
	messagingSenderId: '619808274792',
	appId: '1:619808274792:web:6daec642a20eae962abedd',
	measurementId: 'G-EBM1PZ4W6K',
};

try {
	firebase.initializeApp(config);
} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error('Firebase initialization error', err.stack);
	}
}
firebase
	.firestore()
	.enablePersistence()
	.catch((err) => {
		if (err.code == 'failed-precondition') {
			// Multiple tabs open, persistence can only be enabled
			// in one tab at a a time.
			// ...
		} else if (err.code == 'unimplemented') {
			// The current browser does not support all of the
			// features required to enable persistence
			// ...
		}
	});
// Subsequent queries will use persistence, if it was enabled successfully

export default firebase;
