const form = document.getElementById('spotlightForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value || "Free";

  const spotlight = {
    title,
    description,
    price,
    date: new Date().toLocaleString()
  };

  console.log("New Spotlight:", spotlight);
  alert("Spotlight submitted successfully!");
  form.reset();
});
