import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDZzNQcecE-m7VdN6EZ4q4oo_gudzvsjyc",
  authDomain: "bushub-e5d68.firebaseapp.com",
  projectId: "bushub-e5d68",
  storageBucket: "bushub-e5d68.appspot.com",
  messagingSenderId: "419368778198",
  appId: "1:419368778198:web:a9a3e6ea4f6f95bf9a8c77",
  measurementId: "G-SHBY0QXGHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Password visibility toggle
const toggleBtn = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
toggleBtn.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Login form submit
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("errorBox");
  errorBox.classList.add("hidden");

  try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get role from Firestore
    const usersRef = collection(db, "user"); // 🔥 your Firestore collection is "user"
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      errorBox.innerText = "User record not found!";
      errorBox.classList.remove("hidden");
      return;
    }

    const userData = snapshot.docs[0].data();

    // Redirect based on role
    if (userData.role === "admin") window.location.href = "admin_dashboard.html";
    else if (userData.role === "driver") window.location.href = "driver_dashboard.html";
    else window.location.href = "user_dashboard.html";

  } catch (error) {
    console.error(error);
    errorBox.innerText = "Incorrect email or password!";
    errorBox.classList.remove("hidden");
  }
});
