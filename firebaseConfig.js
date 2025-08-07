// importando funções do firebase importantes p o login
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that I want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//configuração do firebase
const firebaseConfig = {
  apiKey: "AIzaSyBawHuPMTXd1lDTJfD4QdoCjx_uxHGckCY",
  authDomain: "verocai-ed288.firebaseapp.com",
  projectId: "verocai-ed288",
  storageBucket: "verocai-ed288.firebasestorage.app",
  messagingSenderId: "909704015051",
  appId: "1:909704015051:web:db01b2fd445c190b98ff4e",
  measurementId: "G-3QT9EGV962"
};

// inicializano firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, doc, setDoc }