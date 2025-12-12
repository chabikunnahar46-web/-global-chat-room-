import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

document.getElementById("signupBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => {
      alert("Account Created!");
      window.location.href = "profile.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
