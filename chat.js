import { database } from "./firebase.js";
import { ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let userName = prompt("Enter your name:") || "Guest";
let userIcon = "https://i.postimg.cc/02Qmwvhd/avatar.png";

const messagesRef = ref(database, "globalMessages");

// Profile popup
const profilePopup = document.getElementById("profilePopup");
const popupName = document.getElementById("popupName");
const popupIcon = document.getElementById("popupIcon");
const popupAge = document.getElementById("popupAge");
const closePopup = document.getElementById("closePopup");

closePopup.addEventListener("click", () => profilePopup.style.display = "none");

// Send message
sendBtn.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (!msg) return;

  push(messagesRef, {
    name: userName,
    icon: userIcon,
    message: msg,
    age: Math.floor(Math.random() * 50) + 13, // demo age
    time: Date.now()
  });

  messageInput.value = "";
});

// Load messages in real-time
onValue(messagesRef, (snapshot) => {
  chatBox.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    const msgKey = childSnapshot.key;

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(data.name === userName ? "my-message" : "other-message");

    msgDiv.innerHTML = `
      <img src="${data.icon}" alt="icon">
      <div><strong>${data.name}</strong>: ${data.message}</div>
      ${data.name === userName ? '<button class="delete-btn">🗑️</button>' : ''}
    `;
    chatBox.appendChild(msgDiv);

    // Click profile icon to show popup
    msgDiv.querySelector("img").addEventListener("click", () => {
      popupName.textContent = data.name;
      popupIcon.src = data.icon;
      popupAge.textContent = "Age: " + data.age;
      profilePopup.style.display = "block";
    });

    // Delete own messages
    if (data.name === userName) {
      msgDiv.querySelector(".delete-btn").addEventListener("click", () => {
        remove(ref(database, `globalMessages/${msgKey}`));
      });
    }
  });

  chatBox.scrollTop = chatBox.scrollHeight;
});
