<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  databaseURL: "https://global-chat-75f38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "global-chat-75f38",
  storageBucket: "global-chat-75f38.firebasestorage.app",
  messagingSenderId: "682790896070",
  appId: "1:682790896070:web:5d142dec99031730f072c7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

/* 🔹 SIGN UP */
window.signup = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      // 🔥 Save profile data
      set(ref(db, "users/" + uid), {
        name: name,
        email: email,
        location: "India",
        role: "New User",
        work: "Member"
      });

      // ✅ Redirect to profile
      window.location.href = "profile.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

/* 🔹 LOGIN */
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "profile.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};
</script>
