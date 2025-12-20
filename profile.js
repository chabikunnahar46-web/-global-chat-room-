import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { 
  getDatabase, 
  ref, 
  get 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  databaseURL: "https://global-chat-75f38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "global-chat-75f38",
  storageBucket: "global-chat-75f38.firebasestorage.app",
  messagingSenderId: "682790896070",
  appId: "1:682790896070:web:5d142dec99031730f072c7"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Logged user check
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "signup.html";
    return;
  }

  const uid = user.uid;

  get(ref(db, "users/" + uid))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        document.querySelector(".info h2").innerText =
          data.name || "No Name";

        document.getElementById("location").innerText =
          "🏠 Lives in " + (data.location || "Not set");

        document.getElementById("role").innerText =
          "🎓 " + (data.role || "Student / Developer");

        document.getElementById("work").innerText =
          "💼 " + (data.work || "Social Network Creator");

      } else {
        console.log("No profile data found");
      }
    })
    .catch((error) => {
      console.error("Error loading profile:", error);
    });
});
