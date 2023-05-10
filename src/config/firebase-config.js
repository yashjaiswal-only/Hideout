import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STROAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage();
export const db = getFirestore()

const auth = getAuth()
auth.languageCode = 'it'
  
const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const FacebookProvider = new FacebookAuthProvider();
FacebookProvider.addScope('user_birthday');

export {auth, GoogleProvider, FacebookProvider}
export default app