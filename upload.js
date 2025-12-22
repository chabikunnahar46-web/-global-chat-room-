 const cloudName = "dj1wdote4";
const uploadPreset = "My upload"; // 🔥 তোমার preset name

function uploadImage(file, type) {
  if (!file) return;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  fetch(url, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (!data.secure_url) {
      alert("Upload failed");
      return;
    }

    if (type === "dp") {
      document.getElementById("dp").src = data.secure_url;
      saveToFirebase("photo", data.secure_url);
    }

    if (type === "cover") {
      document.getElementById("cover").style.backgroundImage =
        `url(${data.secure_url})`;
      saveToFirebase("cover", data.secure_url);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Cloudinary error");
  });
    }
