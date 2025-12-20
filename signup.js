import { auth, db } from "./firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, set } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  { size: "invisible" }
);

let confirmationResult;

window.sendOTP = function () {
  const phone = document.getElementById("phone").value;
  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then(result => {
      confirmationResult = result;
      document.getElementById("otp-box").style.display = "block";
      alert("OTP পাঠানো হয়েছে");
    })
    .catch(err => alert(err.message));
};

window.verifyOTP = function () {
  const otp = document.getElementById("otp").value;
  confirmationResult.confirm(otp).then(result => {
    const user = result.user;

    set(ref(db, "users/" + user.uid), {
      phone: user.phoneNumber,
      name: "New User",
      createdAt: Date.now()
    });

    window.location.href = "profile.html";
  });
};
