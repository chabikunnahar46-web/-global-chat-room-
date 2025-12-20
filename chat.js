import { db } from "./firebase.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const chatRef = ref(db, "globalChat");

window.sendMsg = function () {
  const msg = document.getElementById("msgInput").value;
  if (msg === "") return;

  push(chatRef, {
    name: "Guest",
    message: msg,
    time: Date.now()
  });

  document.getElementById("msgInput").value = "";
};

onValue(chatRef, (snapshot) => {
  const box = document.getElementById("chatBox");
  box.innerHTML = "";

  snapshot.forEach(child => {
    const data = child.val();
    const div = document.createElement("div");
    div.innerHTML = `<b>${data.name}</b>: ${data.message}`;
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
});
