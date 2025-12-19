// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { 
  getDatabase, 
  ref, 
  set 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// 🔹 তোমার Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  databaseURL: "https://global-chat-75f38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "global-chat-75f38",
  storageBucket: "global-chat-75f38.firebasestorage.app",
  messagingSenderId: "682790896070",
  appId: "1:682790896070:web:5d142dec99031730f072c7",
  measurementId: "G-X9H4HM2010"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// 🔥 Facebook-like signup function
window.signup = function () {

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("সব ফিল্ড পূরণ করো");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      const uid = user.uid;

      // 🔹 Profile data save
      set(ref(db, "users/" + uid), {
        name: name,
        email: email,
        location: "India",
        role: "Student / Developer",
        work: "Social Network Creator",
        createdAt: Date.now()
      });

      // 🔹 Profile page redirect
      window.location.href = "profile.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};
