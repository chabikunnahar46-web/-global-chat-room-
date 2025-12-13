import { db, ref, set } from './firebase.js'; // তোমার firebase.js ফাইলের নাম অনুযায়ী ঠিক করো

const form = document.getElementById("profileForm");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent form refresh

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const work = document.getElementById("work").value;
  const school = document.getElementById("school").value;
  const girlfriend = document.getElementById("girlfriend").value;
  const balance = document.getElementById("balance").value;

  // Generate a unique ID for each profile
  const profileId = Date.now();

  set(ref(db, 'profiles/' + profileId), {
    name,
    age,
    city,
    work,
    school,
    girlfriend,
    balance,
    createdAt: new Date().toISOString()
  })
  .then(() => {
    alert("Profile saved successfully!");
    form.reset(); // Clear the form
  })
  .catch((error) => {
    console.error("Error saving profile: ", error);
    alert("Failed to save profile.");
  });
});
