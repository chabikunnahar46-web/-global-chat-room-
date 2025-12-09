// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  projectId: "global-chat-75f38",
  storageBucket: "global-chat-75f38.firebasestorage.app",
  messagingSenderId: "682790896070",
  appId: "1:682790896070:web:5d142dec99031730f072c7",
  measurementId: "G-X9H4HM2010"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
