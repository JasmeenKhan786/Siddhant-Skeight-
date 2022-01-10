import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyArfTcYUcABlvj3-043_uqTeOUpCIsiGX0",
  authDomain: "under18-ff13d.firebaseapp.com",
  projectId: "under18-ff13d",
  storageBucket: "under18-ff13d.appspot.com",
  messagingSenderId: "368710830788",
  appId: "1:368710830788:web:6111d3c6568461fd8e9791",
  measurementId: "G-GS5EPTD4D8"}

   // Initialize Firebase
   if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
 }
export default firebase.firestore();