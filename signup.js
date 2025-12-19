import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.signup = function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      // 🔥 নাম save করা হচ্ছে
      set(ref(db, "users/" + uid), {
        name: name,
        location: "India",
        role: "Student / Developer",
        work: "Social Network Creator"
      });

      localStorage.setItem("uid", uid);
      window.location.href = "profile.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};
