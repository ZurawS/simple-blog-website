import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChGZkosEEy3pSkp-qX5-fdLtXbaE-TS-c",
  authDomain: "vue-first-firebase-site.firebaseapp.com",
  projectId: "vue-first-firebase-site",
  storageBucket: "vue-first-firebase-site.appspot.com",
  messagingSenderId: "1017575532847",
  appId: "1:1017575532847:web:85bea09e7b3783ac4e19da",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init firestore service
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp };
