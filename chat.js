import { database } from "./firebase.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// ইউজারের নাম এবং প্রোফাইল আইকন (ডেমো)
let userName = prompt("Enter your name:") || "Guest";
let userIcon = "https://i.postimg.cc/02Qmwvhd/avatar.png"; // ডিফল্ট প্রোফাইল আইকন

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const messagesRef = ref(database, "messages");

// মেসেজ পাঠানো
sendBtn.addEventListener("click", () => {
  let msg = messageInput.value.trim();
  if(msg){
    push(messagesRef, {
      name: userName,
      message: msg,
      icon: userIcon
    });
    messageInput.value = '';
  }
});

// রিয়েলটাইম ডাটাবেস থেকে মেসেজ লোড করা
onValue(messagesRef, (snapshot) => {
  chatBox.innerHTML = '';
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(data.name === userName ? "my-message" : "other-message");

    // মেসেজের পাশে প্রোফাইল আইকন দেখানো
    msgDiv.innerHTML = `
      <img src="${data.icon}" alt="icon">
      <div><strong>${data.name}:</strong> ${data.message}</div>
    `;
    chatBox.appendChild(msgDiv);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
});
