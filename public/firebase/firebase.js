<script type="module">
  import { auth, db } from "../firebase/firebase.js";
  import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  // DOM Elements
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("loginError");
  const loginErrorMessage = document.getElementById("loginErrorMessage");
  const loginButtonText = document.getElementById("loginButtonText");
  const loginSpinner = document.getElementById("loginSpinner");
  const togglePasswordBtn = document.getElementById("togglePassword");

  // Password toggle
  togglePasswordBtn?.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  });

  // UB Email Validation
  function validateUBDomain(email) {
    return email.toLowerCase().endsWith("@ub.edu.bz");
  }

  // Login Handler
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.classList.add("hidden");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!validateUBDomain(email)) {
      loginErrorMessage.textContent = "Only UB (@ub.edu.bz) emails are allowed.";
      loginError.classList.remove("hidden");
      return;
    }

    // Show loading
    loginButtonText.textContent = "Signing In...";
    loginSpinner.classList.remove("hidden");

    try {
      // Firebase login
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Fetch role from Firestore
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        loginErrorMessage.textContent = "User record missing. Contact admin.";
        loginError.classList.remove("hidden");
        return;
      }

      const role = userSnap.data().role;

      // Redirect by role
      switch (role) {
        case "admin":
          window.location.href = "admin_dashboard.html";
          break;
        case "driver":
          window.location.href = "driver_dashboard.html";
          break;
        default:
          window.location.href = "user_dashboard.html";
      }

    } catch (err) {
      console.error("Login error:", err);
      loginErrorMessage.textContent = "Invalid email or password.";
      loginError.classList.remove("hidden");
    } finally {
      loginButtonText.textContent = "Sign In";
      loginSpinner.classList.add("hidden");
    }
  });

  // Auto-focus email field
  window.addEventListener("load", () => {
    emailInput.focus();
  });
</script>
