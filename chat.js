import { database } from "./firebase.js";
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// ইউজারের নাম ও ডিফল্ট আইকন
let userName = prompt("Enter your name:") || "Guest";
let userIcon = "https://i.postimg.cc/02Qmwvhd/avatar.png";

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Database reference
const messagesRef = ref(database, "globalMessages");

// Send button event
sendBtn.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if(!msg) return;

  push(messagesRef, {
    name: userName,
    message: msg,
    icon: userIcon,
    time: Date.now()
  });

  messageInput.value = "";
});

// Firebase থেকে মেসেজ রিয়েলটাইম লোড
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  msgDiv.classList.add(data.name === userName ? "my-message" : "other-message");

  msgDiv.innerHTML = `
    <img src="${data.icon}" alt="icon" class="profile-icon">
    <div><strong>${data.name}:</strong> ${data.message}</div>
  `;

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});
