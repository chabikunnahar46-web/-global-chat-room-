import { db } from "./firebase.js";
import { ref, push, onChildAdded } from 
"https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const chatRef = ref(db, "messages");

window.send = function () {
  let msg = document.getElementById("msg").value;
  push(chatRef, {
    text: msg,
    time: Date.now()
  });
  document.getElementById("msg").value = "";
};

onChildAdded(chatRef, (data) => {
  let div = document.createElement("div");
  div.className = "msg";
  div.innerText = data.val().text;
  document.getElementById("chatBox").appendChild(div);
});
