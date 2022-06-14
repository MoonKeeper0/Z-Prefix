import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// normally this is hidden, but since this is a private repo for a private project, I'll leave it --Tony
// I imagine Huf will replace this with his own stuff later
const firebaseConfig = {
  apiKey: "AIzaSyD8iSq7fGmAL9pnDcWYJ-F_4UkUrI2vaAc",
  authDomain: "sfregistrar-c9c5a.firebaseapp.com",
  projectId: "sfregistrar-c9c5a",
  storageBucket: "sfregistrar-c9c5a.appspot.com",
  messagingSenderId: "214930529331",
  appId: "1:214930529331:web:4e27721cd7ceb32f861746"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init service
const registrarAuth = firebase.auth();

export {
  registrarAuth
}