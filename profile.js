const dpImg = document.getElementById("dpImg");
const coverImg = document.getElementById("coverImg");

dpImg.src = localStorage.getItem("dp") || "";
coverImg.src = localStorage.getItem("cover") || "";

dpInput.onchange = e =>{
  const reader = new FileReader();
  reader.onload = ()=> {
    dpImg.src = reader.result;
    localStorage.setItem("dp", reader.result);
  }
  reader.readAsDataURL(e.target.files[0]);
}

coverInput.onchange = e =>{
  const reader = new FileReader();
  reader.onload = ()=> {
    coverImg.src = reader.result;
    localStorage.setItem("cover", reader.result);
  }
  reader.readAsDataURL(e.target.files[0]);
  }
