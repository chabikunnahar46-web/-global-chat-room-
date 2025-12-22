import { db } from "./firebase.js";
import { ref, push, onChildAdded, remove } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let userName = localStorage.getItem("name") || prompt("Your name?");
localStorage.setItem("name", userName);

const messagesRef = ref(db, "globalMessages");
const msgBox = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Send
sendBtn.onclick = () => {
  if(input.value.trim()==="") return;
  push(messagesRef,{
    name:userName,
    text:input.value,
    time:Date.now(),
    icon:"https://i.postimg.cc/02Qmwvhd/avatar.png"
  });
  input.value="";
};

// Receive
onChildAdded(messagesRef,(snap)=>{
  const d = snap.val();
  const div = document.createElement("div");
  div.className = "msg "+(d.name===userName?"me":"");
  div.innerHTML = `
    <img class="profile" src="${d.icon}">
    <div class="bubble">
      <b>${d.name}</b><br>${d.text}
    </div>
  `;
  div.oncontextmenu = (e)=>{
    e.preventDefault();
    if(d.name===userName && confirm("Delete message?")){
      remove(ref(db,"globalMessages/"+snap.key));
      div.remove();
    }
  }
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
});

// Menu functions
window.toggleMenu = ()=>{
  let m=document.getElementById("menuBox");
  m.style.display = m.style.display==="block"?"none":"block";
};
window.changeName=()=>{
  let n=prompt("New name?");
  if(n){localStorage.setItem("name",n);location.reload();}
};
window.showCountry=()=>{
  alert("Country shown by IP (next step)");
};
window.toggleTheme=()=>{
  document.body.style.background =
  document.body.style.background==="#fff"?"#0b141a":"#fff";
};
