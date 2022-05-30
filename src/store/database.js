// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";


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

// Initializing a new database using getFirestore function
const db = getFirestore()
// const storage = getStorage()
// const spaceRef = ref(storage, 'images/space.jpg');
export default db


// // Now I need to refer to a collection in a remote database so this js script knows what online database/collection I'm working on
// const collectionRef = collection(db, 'pages')

//           getDocs(collectionRef)
//     .then((snapshot) => {
//         // creating new empty array to store the data that we get from the database
//         let pages = []
//         // looping through every collection data in the database and storing it's information to an array
//         snapshot.docs.forEach((doc) => {
//           pages.push({
//                 ...doc.data(),
//                 id: doc.id
//             })
//     })
//             console.log(pages);
//         })
//         .catch(error => {
//             console.log(error.message)
//         })

// // Now I have data in firebase database and I need to import/use a get function to retrieve the data
// // const addPage = () => {
// //   // let newPage = prompt('Enter page name');
// //   addDoc(collectionRef, {
// //     Name: "new pageeeee"
// //   })
// // }
// // addPage();




