<script type="module">
import { db } from "./firebase.js";
import { ref, push, onChildAdded } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const msgBox = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");

const chatRef = ref(db, "globalChat");

sendBtn.onclick = () => {
  const name = document.getElementById("username").value || "Guest";
  const text = document.getElementById("message").value;

  if (text === "") return;

  push(chatRef, {
    name: name,
    message: text,
    time: Date.now()
  });

  document.getElementById("message").value = "";
};

onChildAdded(chatRef, (snapshot) => {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.className = "msg";
  div.innerHTML = `<b>${data.name}</b>: ${data.message}`;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
});
</script>
