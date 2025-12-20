import { db } from "./firebase.js";
import {
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const userName = prompt("Your name?") || "Guest";
const messagesRef = ref(db, "globalChat");

// SEND MESSAGE
sendBtn.onclick = () => {
  const text = input.value.trim();
  if (text === "") return;

  push(messagesRef, {
    name: userName,
    message: text,
    time: Date.now()
  });

  input.value = "";
};

// RECEIVE MESSAGE
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<b>${data.name}</b>: ${data.message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
