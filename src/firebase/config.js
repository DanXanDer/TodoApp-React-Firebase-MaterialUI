// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0zavJGH6A6pqK8f0bugoLX3e_kod8wDM",
  authDomain: "react-todo-11957.firebaseapp.com",
  projectId: "react-todo-11957",
  storageBucket: "react-todo-11957.appspot.com",
  messagingSenderId: "475702555497",
  appId: "1:475702555497:web:6b48e8756cb863945e83f8",
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseDB = getFirestore(FireBaseApp);
export const FireBaseAuth = getAuth(FireBaseApp);
