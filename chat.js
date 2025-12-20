import { database } from "./firebase.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let userName = prompt("Enter your name:") || "Guest";
let userIcon = "https://i.postimg.cc/02Qmwvhd/avatar.png";

const messagesRef = ref(database, "globalMessages");

// Send message on button click
sendBtn.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if(!msg) return; // empty message not sent

  push(messagesRef, {
    name: userName,
    message: msg,
    icon: userIcon,
    time: Date.now()
  });

  messageInput.value = "";
});

// Real-time messages load
onValue(messagesRef, (snapshot) => {
  chatBox.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(data.name === userName ? "my-message" : "other-message");

    msgDiv.innerHTML = `
      <img src="${data.icon}" alt="icon">
      <div><strong>${data.name}:</strong> ${data.message}</div>
    `;
    chatBox.appendChild(msgDiv);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Send message on Enter key press
messageInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") sendBtn.click();
});
