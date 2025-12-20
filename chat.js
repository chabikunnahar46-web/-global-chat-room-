import { database } from "./firebase.js";
import { ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Profile popup
const profilePopup = document.getElementById("profilePopup");
const popupName = document.getElementById("popupName");
const closePopup = document.getElementById("closePopup");
const deleteMsgBtn = document.getElementById("deleteMsgBtn");

let selectedMsgKey = null;

let userName = prompt("Enter your name:") || "Guest";
let userIcon = "https://i.postimg.cc/02Qmwvhd/avatar.png";

const messagesRef = ref(database, "globalMessages");

// Send message
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") sendMessage();
});

function sendMessage(){
  const msg = messageInput.value.trim();
  if(!msg) return;

  push(messagesRef, {
    name: userName,
    message: msg,
    icon: userIcon,
    time: Date.now()
  });
  messageInput.value = "";
}

// Load messages
onValue(messagesRef, (snapshot) => {
  chatBox.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    const key = childSnapshot.key;

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(data.name === userName ? "my-message" : "other-message");
    msgDiv.innerHTML = `<img src="${data.icon}" alt="icon"><div><strong>${data.name}:</strong> ${data.message}</div>`;
    
    // Click to open profile popup
    msgDiv.querySelector("img").addEventListener("click", () => {
      profilePopup.style.display = "flex";
      popupName.innerText = data.name;
      selectedMsgKey = key;
    });

    chatBox.appendChild(msgDiv);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Close popup
closePopup.addEventListener("click", () => {
  profilePopup.style.display = "none";
  selectedMsgKey = null;
});

// Delete message
deleteMsgBtn.addEventListener("click", () => {
  if(selectedMsgKey){
    remove(ref(database, `globalMessages/${selectedMsgKey}`));
    profilePopup.style.display = "none";
  }
});
