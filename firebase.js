// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw7earOkG9OgH-Ix8tA2glYTxY8i2XMF0",
  authDomain: "timeklipper.firebaseapp.com",
  projectId: "timeklipper",
  storageBucket: "timeklipper.appspot.com",
  messagingSenderId: "306588062593",
  appId: "1:306588062593:web:847b0536cf3668482e0e80"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var auth = firebase.auth();


export default db
export {auth}
export {firebase}