
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAgcJMj1VUw4F4K6Cfe8ZABjb5584q_tS8",
  authDomain: "trelloclone-dced6.firebaseapp.com",
  projectId: "trelloclone-dced6",
  storageBucket: "trelloclone-dced6.firebasestorage.app",
  messagingSenderId: "392234732981",
  appId: "1:392234732981:web:d020b702c4c45aa1f2ddfc",
  measurementId: "G-J58DLEQ9G0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
