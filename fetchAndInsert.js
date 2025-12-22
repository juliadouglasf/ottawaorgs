async function fetchAndInsert(id, file) {
  const container = document.getElementById(id);
  const html = await fetch(file).then(r => r.text());
  container.innerHTML = html;
}

fetchAndInsert("navbar", "navbar.html");
fetchAndInsert("footer", "footer.html");