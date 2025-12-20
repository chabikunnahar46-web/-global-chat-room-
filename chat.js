import { db } from "./firebase.js";
import { ref, push, onChildAdded } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const messagesRef = ref(db, "globalMessages");

const msgBox = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = () => {
  const name = document.getElementById("username").value || "Guest";
  const text = document.getElementById("message").value;

  if(text.trim() === "") return;

  push(messagesRef,{
    name: name,
    message: text,
    time: Date.now()
  });

  document.getElementById("message").value = "";
};

onChildAdded(messagesRef, snapshot => {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.className = "msg";
  div.innerHTML = `<b>${data.name}</b><br>${data.message}`;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
});
