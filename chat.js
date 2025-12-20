// chat.js
import { database } from "./firebase.js";
import { ref, push, onChildAdded } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

const username = prompt("Your name?") || "Guest";

const messagesRef = ref(database, "globalMessages");

// SEND MESSAGE
sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  push(messagesRef, {
    name: username,
    message: text,
    time: Date.now()
  });

  input.value = "";
});

// RECEIVE MESSAGE
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.innerHTML = `<b>${data.name}:</b> ${data.message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
