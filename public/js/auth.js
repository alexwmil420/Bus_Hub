// =======================
// Firebase Auth Handler
// =======================

// 1. Your Firebase config (COPY YOUR OWN CONFIG HERE)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 2. Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ==========================
// LOGIN FUNCTION
// ==========================

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        // Firebase login
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        console.log("Login successful:", user.email);

        // Now determine role
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
// (checks email → sends user to correct dashboard)
// ==========================

function routeUserByRole(email) {

    // ADMIN EMAILS
    const adminEmails = [
        "admin@ub.edu",
        "bossman@ub.edu",
        "itadmin@ub.edu"
    ];

    // DRIVERS
    const driverEmails = [
        "driver1@ub.edu",
        "driver2@ub.edu",
        "busdriver@ub.edu"
    ];

    // ROUTES
    if (adminEmails.includes(email)) {
        window.location.href = "admin_dashboard.html";
    }
    else if (driverEmails.includes(email)) {
        window.location.href = "driver_dashboard.html";
    }
    else {
        // Default student user
        window.location.href = "user_dashboard.html";
    }
}
