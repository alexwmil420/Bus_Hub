import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function loginUser(email, password) {
    try {
        // 1️⃣ Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2️⃣ Query Firestore for extra data (like role)
        const usersRef = collection(db, "user"); // Firestore collection
        const q = query(usersRef, where("email", "==", user.email));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.error("No user record found in Firestore");
            return null;
        }

        const userData = snapshot.docs[0].data();

        // 3️⃣ Redirect based on role
        if (userData.role === "admin") window.location.href = "admin_dashboard.html";
        else if (userData.role === "driver") window.location.href = "driver_dashboard.html";
        else window.location.href = "user_dashboard.html";

    } catch (error) {
        console.error("Login failed:", error);
        alert(error.message); // or show in your errorBox div
    }
}
