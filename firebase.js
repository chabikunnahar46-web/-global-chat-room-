<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  databaseURL: "https://global-chat-75f38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "global-chat-75f38",
  storageBucket: "global-chat-75f38.appspot.com",
  messagingSenderId: "682790896070",
  appId: "1:682790896070:web:5d142dec99031730f072c7"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
</script>
