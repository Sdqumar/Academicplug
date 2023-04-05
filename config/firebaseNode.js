import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const credential = cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS));

const apps = getApps();
if (!apps.length) {
  initializeApp({
    credential,
  });
}

const firestore = getFirestore();

export { firestore };
