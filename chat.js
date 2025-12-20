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
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  databaseURL: "https://global-chat-75f38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "global-chat-75f38",
  storageBucket: "global-chat-75f38.appspot.com",
  messagingSenderId: "682790896070",
  appId: "1:682790896070:web:5d142dec99031730f072c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
