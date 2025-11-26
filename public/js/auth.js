import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// =======================
// Firebase config
// =======================
const firebaseConfig = {
    apiKey: "AIzaSyDZzNQcecE-m7VdN6EZ4q4oo_gudzvsjyc",
    authDomain: "bushub-e5d68.firebaseapp.com",
    projectId: "bushub-e5d68",
    storageBucket: "bushub-e5d68.appspot.com", // ✅ fixed
    messagingSenderId: "419368778198",
    appId: "1:419368778198:web:a9a3e6ea4f6f95bf9a8c77",
    measurementId: "G-SHBY0QXGHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ==========================
// LOGIN FUNCTION
// ==========================
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password); // ✅ fixed
        const user = userCredential.user;

        console.log("Login successful:", user.email);

        routeUserByRole(email);

    } catch (error) {
        console.error("Login error:", error);

        const errBox = document.getElementById("errorBox");
        errBox.innerText = error.message;
        errBox.classList.remove("hidden");
    }
});

// ==========================
// ROLE ROUTER
// ==========================
function routeUserByRole(email) {
    const adminEmails = ["admin@ub.edu.bz","bossman@ub.edu.bz","itadmin@ub.edu.bz"];
    const driverEmails = ["driver@ub.edu.bz","driver2@ub.edu.bz","busdriver@ub.edu.bz"];

    if (adminEmails.includes(email)) window.location.href = "admin_dashboard.html";
    else if (driverEmails.includes(email)) window.location.href = "driver_dashboard.html";
    else window.location.href = "user_dashboard.html";
}

// ==========================
// Optional: react to auth state
// ==========================
onAuthStateChanged(auth, (user) => {
    if (user) console.log("User already logged in:", user.email);
});
