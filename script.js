let chatBox = document.getElementById("chat-box");

function sendMessage() {
    let msg = document.getElementById("messageInput").value;

    if (msg.trim() === "") return;

    let div = document.createElement("div");
    div.innerHTML = "<b>You:</b> " + msg;
    div.style.margin = "10px 0";
    
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;

    document.getElementById("messageInput").value = "";
}
