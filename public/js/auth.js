<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - BusHub</title>
  <link rel="stylesheet" href="../css/main.css">
</head>
<body class="bg-background min-h-screen">
  <main class="flex-1 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="bg-surface rounded-lg shadow-civic-lg border border-border p-6 sm:p-8">
        <h1 class="text-2xl font-bold text-text-primary mb-4 text-center">Sign In</h1>

        <div id="errorBox" class="hidden bg-red-100 text-red-700 p-2 rounded mb-4"></div>

        <form id="loginForm" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-text-primary mb-2">Email Address *</label>
            <input type="email" id="email" required class="form-input w-full p-2 border rounded">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-text-primary mb-2">Password *</label>
            <input type="password" id="password" required class="form-input w-full p-2 border rounded">
            <button type="button" id="togglePassword">Show/Hide</button>
          </div>
          <button type="submit" class="w-full bg-primary text-white p-2 rounded font-semibold">Sign In</button>
        </form>
      </div>
    </div>
  </main>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
    import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDZzNQcecE-m7VdN6EZ4q4oo_gudzvsjyc",
      authDomain: "bushub-e5d68.firebaseapp.com",
      projectId: "bushub-e5d68",
      storageBucket: "bushub-e5d68.appspot.com",
      messagingSenderId: "419368778198",
      appId: "1:419368778198:web:a9a3e6ea4f6f95bf9a8c77",
      measurementId: "G-SHBY0QXGHN"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Toggle password visibility
    const toggleBtn = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    toggleBtn.addEventListener("click", () => {
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    document.getElementById("loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = passwordInput.value;
      const errorBox = document.getElementById("errorBox");
      errorBox.classList.add("hidden");

      try {
        // 1️⃣ Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2️⃣ Fetch user role from Firestore
        const usersRef = collection(db, "user");
        const q = query(usersRef, where("email", "==", email));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          errorBox.innerText = "User not found in database!";
          errorBox.classList.remove("hidden");
          return;
        }

        const userData = snapshot.docs[0].data();

        // 3️⃣ Redirect based on role
        if (userData.role === "admin") window.location.href = "admin_dashboard.html";
        else if (userData.role === "driver") window.location.href = "driver_dashboard.html";
        else window.location.href = "user_dashboard.html";

      } catch (err) {
        console.error(err);
        errorBox.innerText = "Incorrect email or password!";
        errorBox.classList.remove("hidden");
      }
    });
  </script>
</body>
</html>
