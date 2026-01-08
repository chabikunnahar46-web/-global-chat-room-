function selectType(type) {
  let formArea = document.getElementById("form-area");

  if (type === "knowledge") {
    formArea.innerHTML = `
      <form>
        <h3>🧠 Knowledge Clip</h3>
        <input type="text" placeholder="Topic Title" required>
        <textarea rows="3" placeholder="English Content" required></textarea>
        <textarea rows="3" placeholder="বাংলা (Translated)" required></textarea>
        <button type="submit">Submit for Review</button>
      </form>
    `;
  }

  if (type === "blogger") {
    formArea.innerHTML = `
      <form>
        <h3>✍️ Blogger Post</h3>
        <input type="text" placeholder="Post Title" required>
        <textarea rows="6" placeholder="Write your post..." required></textarea>
        <button type="submit">Submit for Review</button>
      </form>
    `;
  }
}
