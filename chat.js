// Firebase loaded from firebase.js

const db = firebase.database();
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("messageInput");

// Send message
sendBtn.onclick = () => {
    let msg = msgInput.value.trim();
    if (msg === "") return;

    db.ref("messages").push({
        text: msg,
        from: "user",
        time: Date.now()
    });

    msgInput.value = "";
};

// Load messages
db.ref("messages").on("child_added", (snapshot) => {
    let data = snapshot.val();

    let div = document.createElement("div");
    div.classList.add("message");

    if (data.from === "user") div.classList.add("my-message");
    else div.classList.add("other-message");

    div.innerText = data.text;
    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
});
