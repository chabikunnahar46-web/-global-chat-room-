import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  databaseURL: "https://global-chat-75f38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "global-chat-75f38",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// 🔐 Check login
let currentUser;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Login first");
    window.location.href = "index.html";
  } else {
    currentUser = user;
  }
});

// 📤 Send message
window.sendMessage = function () {
  const text = document.getElementById("msg").value.trim();
  if (!text) return;

  push(ref(db, "globalChat"), {
    uid: currentUser.uid,
    message: text,
    time: Date.now()
  });

  document.getElementById("msg").value = "";
};

// 📥 Receive messages
onChildAdded(ref(db, "globalChat"), (snapshot) => {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.innerText = data.message;
  document.getElementById("chat").appendChild(div);
});
