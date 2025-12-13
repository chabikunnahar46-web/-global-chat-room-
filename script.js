// Firebase CDN ব্যবহার করলে script ট্যাগে এগুলো থাকবে
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } 
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  databaseURL: "https://global-chat-75f38-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "global-chat-75f38",
  storageBucket: "global-chat-75f38.firebasestorage.app",
  messagingSenderId: "682790896070",
  appId: "1:682790896070:web:5d142dec99031730f072c7",
  measurementId: "G-X9H4HM2010"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
