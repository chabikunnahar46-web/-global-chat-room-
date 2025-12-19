function goEdit() {
  window.location.href = "edit_profile.html";
}

window.onload = () => {
  if (localStorage.getItem("cover"))
    document.getElementById("coverImg").src = localStorage.getItem("cover");

  if (localStorage.getItem("dp"))
    document.getElementById("dpImg").src = localStorage.getItem("dp");

  if (localStorage.getItem("location"))
    document.getElementById("location").innerText =
      "🏠 " + localStorage.getItem("location");

  if (localStorage.getItem("role"))
    document.getElementById("role").innerText =
      "🎓 " + localStorage.getItem("role");

  if (localStorage.getItem("work"))
    document.getElementById("work").innerText =
      "💼 " + localStorage.getItem("work");
};
