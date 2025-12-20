import { db } from "./firebase.js";
import { ref, push, onChildAdded } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const userName = prompt("Your name?") || "Guest";
const userIcon = "https://i.postimg.cc/02Qmwvhd/avatar.png";

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const chatRef = ref(db, "globalChat");

// SEND MESSAGE
sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  push(chatRef, {
    name: userName,
    message: text,
    icon: userIcon,
    time: Date.now()
  });

  input.value = "";
};

// RECEIVE MESSAGE
onChildAdded(chatRef, (snapshot) => {
  const data = snapshot.val();

  const div = document.createElement("div");
  div.className = "msg";

  div.innerHTML = `
    <img src="${data.icon}">
    <div class="msg-content">
      <b>${data.name}</b><br>
      ${data.message}
    </div>
  `;

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
