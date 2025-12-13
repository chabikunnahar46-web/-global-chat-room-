function checkAge() {
  let age = document.getElementById("age").value;
  let gfBox = document.getElementById("gfBox");

  if (age <= 24 && age != "") {
    gfBox.style.display = "block";
  } else {
    gfBox.style.display = "none";
  }
}

function saveProfile() {
  let data = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    girlfriend: document.getElementById("girlfriend")?.value || "",
    work: document.getElementById("work").value,
    school: document.getElementById("school").value,
    live: document.getElementById("live").value,
    bank: document.getElementById("bank").value
  };

  localStorage.setItem("userProfile", JSON.stringify(data));
  alert("Profile Saved!");
  window.location.href = "profile.html";
}
