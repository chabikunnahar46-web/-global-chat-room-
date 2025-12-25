import { auth, db } from "./firebase.js";
import {
  ref,
  push,
  onChildAdded,
  remove
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  ref as dbRef,
  get
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/* 🔗 Elements */
const msgBox = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesRef = ref(db, "globalMessages");

let userName = "Guest";
let userCountry = "";
let userIcon = "https://i.postimg.cc/02Qmwvhd/avatar.png";

/* 🔐 Load user profile from Firebase */
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const snap = await get(dbRef(db, "users/" + user.uid));
  if (snap.exists()) {
    const d = snap.val();
    userName = d.name || "Guest";
    userCountry = d.country || "";
    userIcon = d.dp || userIcon;

    // show name in top bar
    document.querySelector(".title").innerText =
      userName + (userCountry ? " 🌍 " + userCountry : "");
  }
});

/* 📤 Send Message */
sendBtn.onclick = () => {
  if (input.value.trim() === "") return;

  push(messagesRef, {
    name: userName,
    text: input.value,
    time: Date.now(),
    icon: userIcon
  });

  input.value = "";
};

/* 📥 Receive Messages */
onChildAdded(messagesRef, (snap) => {
  const d = snap.val();

  const div = document.createElement("div");
  div.className = "msg " + (d.name === userName ? "me" : "");

  div.innerHTML = `
    <img class="profile" src="${d.icon}">
    <div class="bubble">
      <b>${d.name}</b><br>${d.text}
    </div>
  `;

  /* 🗑 Delete own message */
  div.oncontextmenu = (e) => {
    e.preventDefault();
    if (d.name === userName && confirm("Delete message?")) {
      remove(ref(db, "globalMessages/" + snap.key));
      div.remove();
    }
  };

  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
});

/* ☰ Menu functions */
window.toggleMenu = () => {
  const m = document.getElementById("menuBox");
  m.style.display = m.style.display === "block" ? "none" : "block";
};

window.changeName = () => {
  window.location.href = "profile.html";
};

window.showCountry = () => {
  alert(userCountry ? userCountry : "Country not set");
};

window.toggleTheme = () => {
  document.body.classList.toggle("dark");
};
