const avatarInput = document.getElementById("avatarInput");
const coverInput = document.getElementById("coverInput");

avatarInput.onchange = () => previewImage(avatarInput, "avatarPreview");
coverInput.onchange = () => previewImage(coverInput, "coverPreview");

function previewImage(input, imgId) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById(imgId).src = reader.result;
  };
  reader.readAsDataURL(file);
}

function saveProfile() {
  const age = Number(ageInput.value);

  const data = {
    name: name.value,
    age: age,
    city: city.value,
    work: work.value,
    school: school.value,
    girlfriend: age <= 24 ? girlfriend.value : "",
    balance: age >= 25 ? balance.value : "",
    avatar: avatarPreview.src,
    cover: coverPreview.src
  };

  localStorage.setItem("profile", JSON.stringify(data));
  alert("Profile Saved");
}
