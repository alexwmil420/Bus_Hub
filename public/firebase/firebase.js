// Import Firebase modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// =======================
// Firebase config
// =======================
const firebaseConfig = {
  apiKey: "AIzaSyDZzNQcecE-m7VdN6EZ4q4oo_gudzvsjyc",
  authDomain: "bushub-e5d68.firebaseapp.com",
  projectId: "bushub-e5d68",
  storageBucket: "bushub-e5d68.appspot.com", // ✅ correct
  messagingSenderId: "419368778198",
  appId: "1:419368778198:web:a9a3e6ea4f6f95bf9a8c77",
  measurementId: "G-SHBY0QXGHN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
