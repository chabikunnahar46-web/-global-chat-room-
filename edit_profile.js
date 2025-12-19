import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  databaseURL: "https://global-chat-75f38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "global-chat-75f38",
};

// Init
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Save function
window.saveProfile = function () {
  const profileData = {
    name: document.getElementById("name").value,
    city: document.getElementById("city").value,
    work: document.getElementById("work").value,
    school: document.getElementById("school").value
  };

  // TEMP user id (later auth দিয়ে dynamic করবে)
  set(ref(db, "users/demoUser"), profileData)
    .then(() => {
      alert("Profile saved successfully ✅");
      window.location.href = "profile.html";
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
};
