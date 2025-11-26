import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function loginUser(email, password) {
    try {
        // UB email validation
        if (!email.toLowerCase().endsWith("@ub.edu.bz")) {
            throw new Error("Only UB (@ub.edu.bz) emails are allowed.");
        }

        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Get user document by UID
        const userRef = doc(db, "users", uid); // Ensure collection name is "users"
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            throw new Error("User record missing. Contact admin.");
        }

        const userData = userSnap.data();

        // Redirect based on role
        switch (userData.role) {
            case "admin":
                window.location.href = "admin_dashboard.html";
                break;
            case "driver":
                window.location.href = "driver_dashboard.html";
                break;
            default:
                window.location.href = "user_dashboard.html";
        }

    } catch (error) {
        console.error("Login failed:", error);
        // Replace alert with better error display if desired
        alert(error.message);
    }
}
