import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

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

// Load profile data
const userRef = ref(db, "users/demoUser");

get(userRef).then((snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();

    document.getElementById("profileName").innerText =
      data.name || "আপনার নাম";

    document.getElementById("profileCity").innerText =
      "🏠 Lives in " + (data.city || "");

    document.getElementById("profileSchool").innerText =
      "🎓 " + (data.school || "");

    document.getElementById("profileWork").innerText =
      "💼 " + (data.work || "");
  }
});
window.goEdit = function () {
  window.location.href = "edit_profile.html";
};
const params = new URLSearchParams(window.location.search);
const profileUid = params.get("uid");
const myUid = localStorage.getItem("uid");

if (profileUid && profileUid !== myUid) {
  const editBtn = document.querySelector(".edit");
  if (editBtn) editBtn.style.display = "none";
      }
