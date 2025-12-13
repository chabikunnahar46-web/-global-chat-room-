import { db } from "./script.js";
import { ref, push, onChildAdded } 
  from "https://www.gstatic.com/script.js/10.8.0/firebase-database.js";

// Elements
const box = document.getElementById("chatBox");
const input = document.getElementById("msgInput");
const btn = document.getElementById("sendBtn");

// SEND Message
btn.addEventListener("click", () => {
  let text = input.value.trim();
  if (text === "") return;

  push(ref(db, "messages"), {
    name: localStorage.getItem("username") || "User",
    dp: localStorage.getItem("userDP") || "default_dp.png",
    msg: text,
    time: Date.now()
  });

  input.value = "";
});

// LOAD Messages live
onChildAdded(ref(db, "messages"), (snapshot) => {
  let data = snapshot.val();

  let bubble = document.createElement("div");
  bubble.classList.add("message");

  // small DP icon + name
  bubble.innerHTML = `
      <div class="msg-header">
           <img src="${data.dp}" class="icon">
           <span class="uname">${data.name}</span>
      </div>
      <div class="msg-text">${data.msg}</div>
  `;

  box.appendChild(bubble);
  box.scrollTop = box.scrollHeight;
});
