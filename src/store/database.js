// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZUxCEWbkrZq6bC1i-FOPgs_3N-VTzMYY",
    authDomain: "s3-project-8f792.firebaseapp.com",
    databaseURL: "https://s3-project-8f792-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "s3-project-8f792",
    storageBucket: "s3-project-8f792.appspot.com",
    messagingSenderId: "530140339200",
    appId: "1:530140339200:web:67c3e80ecf758fff38cce5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app)

// Initializing a new database using getFirestore function
const db = getFirestore()
export default db