// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore"; 
import { collection, getDocs } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

// Add a second document with a generated ID.
import { addDoc, collection } from "firebase/firestore"; 

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});