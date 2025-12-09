import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
    authDomain: "global-chat-75f38.firebaseapp.com",
    projectId: "global-chat-75f38",
    storageBucket: "global-chat-75f38.firebasestorage.app",
    messagingSenderId: "682790896070",
    appId: "1:682790896070:web:5d142dec99031730f072c7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("messageInput");

// Send Message
sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (text === "") return;

    await addDoc(collection(db, "messages"), {
        text: text,
        time: new Date()
    });

    input.value = "";
};

// Load Messages Live
onSnapshot(collection(db, "messages"), (snapshot) => {
    chatBox.innerHTML = "";

    snapshot.forEach((doc) => {
        const data = doc.data();
        const msg = document.createElement("div");
        msg.classList.add("message", "other-message");
        msg.textContent = data.text;
        chatBox.appendChild(msg);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
});
