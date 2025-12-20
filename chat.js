import { db } from "./firebase.js";
import {
  ref,
  push,
  onChildAdded,
  remove
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const username = prompt("Your name?") || "Guest";
const icon = "https://i.postimg.cc/02Qmwvhd/avatar.png";

const messagesRef = ref(db, "globalMessages");

const input = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

// 👉 Send message
sendBtn.onclick = () => {
  if (input.value.trim() === "") return;

  push(messagesRef, {
    name: username,
    message: input.value,
    icon: icon,
    time: Date.now()
  });

  input.value = "";
};

// 👉 Receive message
onChildAdded(messagesRef, (snap) => {
  const data = snap.val();
  const key = snap.key;

  const div = document.createElement("div");
  div.className = data.name === username ? "msg me" : "msg";

  div.innerHTML = `
    <img src="${data.icon}">
    <span><b>${data.name}</b><br>${data.message}</span>
  `;

  // 📱 Long press → delete
  let pressTimer;
  div.addEventListener("touchstart", () => {
    pressTimer = setTimeout(() => {
      if (confirm("Delete message?")) {
        remove(ref(db, "globalMessages/" + key));
        div.remove();
      }
    }, 800);
  });

  div.addEventListener("touchend", () => {
    clearTimeout(pressTimer);
  });

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
