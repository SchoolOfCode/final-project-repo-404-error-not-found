import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const clientCredentials = {
    apiKey: "AIzaSyDPuRlh4lUZE-e2qEG-GWflZblx56UNef0",
    authDomain:"mentoree-1ab01.firebaseapp.com",
    projectId:"mentoree-1ab01",
    storageBucket:"mentoree-1ab01.appspot.com",
    messagingSenderId: "35053699656",
    appId:"1:35053699656:web:6c8b738652ff8c1ecf8e7d",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
  }
console.log(clientCredentials)
  export default firebase;