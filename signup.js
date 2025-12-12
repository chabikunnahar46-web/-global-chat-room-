let ageInput = document.getElementById("age");
let gfBox = document.getElementById("gf-box");
let bankBox = document.getElementById("bank-box");

ageInput.addEventListener("input", () => {
  let age = Number(ageInput.value);

  if (age >= 1 && age <= 24) {
    gfBox.style.display = "block";
    bankBox.style.display = "none";
  } 
  else if (age >= 25 && age <= 70) {
    gfBox.style.display = "none";
    bankBox.style.display = "block";
  }
});

function createAccount() {
  let name = document.getElementById("name").value;
  let age = Number(document.getElementById("age").value);
  let girlfriend = document.getElementById("girlfriend").value;
  let balance = document.getElementById("balance").value;

  let data = { name, age, girlfriend, balance };

  localStorage.setItem("userProfile", JSON.stringify(data));

  alert("Account Created!");
  window.location.href = "profile.html";
}
