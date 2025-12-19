import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  databaseURL: "https://global-chat-75f38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "global-chat-75f38",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔥 IMPORTANT: function কে window তে attach করো
window.saveProfile = function () {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    alert("User not logged in ❌");
    return;
  }

  const profileData = {
    name: document.getElementById("name").value,
    city: document.getElementById("city").value,
    work: document.getElementById("work").value,
    school: document.getElementById("school").value,
  };

  set(ref(db, "users/" + uid), profileData)
    .then(() => {
      alert("Profile saved successfully ✅");
      window.location.href = "profile.html";
    })
    .catch((error) => {
      alert("Save failed ❌ " + error.message);
      console.error(error);
    });
};
