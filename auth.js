import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBi7uoQT-2Lg-wlGMptk3Dryy43ZA2gpgk",
  authDomain: "global-chat-75f38.firebaseapp.com",
  projectId: "global-chat-75f38",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔴 Page load এ recaptcha init
window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "normal"
  }
);

// 🔹 Send OTP
window.sendOTP = function () {
  let phone = document.getElementById("phone").value.trim();

  if (!phone.startsWith("+")) {
    phone = "+91" + phone;
  }

  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;

      const otp = prompt("Enter OTP");

      return confirmationResult.confirm(otp);
    })
    .then((result) => {
      alert("Login success");
      window.location.href = "profile.html";
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });
};
