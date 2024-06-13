// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb3kmdVUObb1GMs1gZf5BRRzwv6rog2mI",
  authDomain: "clone-cdbbb.firebaseapp.com",
  projectId: "clone-cdbbb",
  storageBucket: "clone-cdbbb.appspot.com",
  messagingSenderId: "617649037142",
  appId: "1:617649037142:web:fa1e7659c66496ed8680f7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig