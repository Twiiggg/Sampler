// importando funções do firebase importantes p o login
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that I want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//configuração do firebase
const firebaseConfig = {
  apiKey: "AIzaSyCw-HZLWj02lhTUIv3iHMth6UypliZ0s1Q",
  authDomain: "verocai-cd316.firebaseapp.com",
  projectId: "verocai-cd316",
  storageBucket: "verocai-cd316.firebasestorage.app",
  messagingSenderId: "128045398398",
  appId: "1:128045398398:web:7c39fb4389bd26c4a31b2f",
  measurementId: "G-8N29GBSPG0"
};

// inicializano firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { app, auth, db, storage, provider };