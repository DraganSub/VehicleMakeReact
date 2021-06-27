import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDI-PwWLJGvsbH3WrSVCLQiP0cEOBi2Nco",
  authDomain: "school-directory-efb9c.firebaseapp.com",
  databaseURL: "https://school-directory-efb9c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "school-directory-efb9c",
  storageBucket: "school-directory-efb9c.appspot.com",
  messagingSenderId: "887392865873",
  appId: "1:887392865873:web:2ad27d5a6f5f9095f93270",
  measurementId: "G-FCTHYMD0KC"
};
  firebase.initializeApp(firebaseConfig);

export default firebase;
