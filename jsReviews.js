const REVIEWS_KEY = "pizzaline_reviews";

function getReviews() {
  return JSON.parse(localStorage.getItem(REVIEWS_KEY)) || [];
}

function saveReviews(arr) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(arr));
}

function renderReviews() {
  const container = document.getElementById("reviews-list");
  if (!container) return;
  const reviews = getReviews();
  container.innerHTML = reviews.map(r => `
    <div class="review-card">
      <strong>${r.name}</strong> — ${'⭐'.repeat(r.rating)}<br/>
      <p>${r.text}</p>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-review");
  renderReviews();
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("review-name").value.trim();
    const text = document.getElementById("review-text").value.trim();
    const rating = Number(document.getElementById("review-rating").value);
    if (!name || !text) return;
    const arr = getReviews();
    arr.unshift({ name, text, rating, date: new Date().toISOString() });
    saveReviews(arr);
    renderReviews();
    form.reset();
  });
});
