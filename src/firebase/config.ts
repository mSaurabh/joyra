import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjMmlqVDObcUuL5T1wGwggmhX9sM_r-Eg",
  authDomain: "thejoyrasite.firebaseapp.com",
  projectId: "thejoyrasite",
  storageBucket: "thejoyrasite.appspot.com",
  messagingSenderId: "1066798538116",
  appId: "1:1066798538116:web:470d760158f0c96092d1d1",
};

// init firebase
const app = firebase.initializeApp(firebaseConfig);

// init firestore
const projectFirestore = app.firestore();

// init auth
const projectAuth = app.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
