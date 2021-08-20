import { useEffect } from 'react';
import { useState } from 'react';
import firebase from '../config/firebase-config';
function Test() {
	const auth = firebase.auth();
	console.log(auth.currentUser);

	return (
		<div>
			<h1>dssd</h1>
		</div>
	);
}

export default Test;
