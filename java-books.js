document.getElementById("btn").addEventListener("click", function (e) {
  e.preventDefault();

  const input = document.getElementById("input");
  const gallary = document.getElementById("gallary");
  const errorMsg = document.getElementById("error");

  const query = input.value.trim();
  gallary.innerHTML = "";
  errorMsg.style.display = "none";

  if (query === "") {
    errorMsg.textContent = "Please enter a book name.";
    errorMsg.style.display = "block";
    return;
  }

  gallary.innerHTML = "<p style='color:#b30000;'>Searching...</p>";

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
    .then((res) => res.json())
    .then((data) => {
      gallary.innerHTML = "";
      if (!data.items || data.items.length === 0) {
        gallary.innerHTML = "<p style='color:#b30000;'>No books found.</p>";
        return;
      }

      const book = data.items[0].volumeInfo;

      // Main card
      const card = document.createElement("div");
      card.style.background = "#2b0000";
      card.style.color = "white";
      card.style.padding = "20px";
      card.style.borderRadius = "15px";
      card.style.maxWidth = "600px"; // smaller width
      card.style.margin = "40px auto";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.alignItems = "center";
      card.style.textAlign = "center";
      card.style.boxShadow = "0 0 15px rgba(179,0,0,0.4)";
      card.style.overflow = "hidden";
      card.style.transition = "0.3s ease";

      const img = document.createElement("img");
      img.src = book.imageLinks?.thumbnail || "https://via.placeholder.com/150x200?text=No+Image";
      img.alt = book.title;
      img.style.width = "150px";
      img.style.height = "200px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "10px";
      img.style.border = "2px solid #ff4d4d";
      img.style.marginBottom = "15px";

      const title = document.createElement("h2");
      title.textContent = book.title || "Untitled";
      title.style.color = "#ff4d4d";
      title.style.fontSize = "1.4em";
      title.style.marginBottom = "5px";

      const author = document.createElement("p");
      author.innerHTML = `<strong>Author:</strong> ${
        book.authors ? book.authors.join(", ") : "Unknown"
      }`;
      author.style.margin = "5px 0";

      const ratingDiv = document.createElement("div");
      if (book.averageRating) {
        const stars = Math.round(book.averageRating);
        let starText = "";
        for (let i = 0; i < 5; i++) starText += i < stars ? "⭐" : "☆";
        ratingDiv.innerHTML = `<strong>Rating:</strong> ${starText} (${book.averageRating}/5)`;
        ratingDiv.style.margin = "8px 0";
      } else {
        ratingDiv.textContent = "No rating available.";
        ratingDiv.style.opacity = "0.8";
      }

      const desc = document.createElement("p");
      desc.textContent = book.description
        ? book.description.slice(0, 200) + "..."
        : "No description available.";
      desc.style.lineHeight = "1.5";
      desc.style.marginTop = "10px";
      desc.style.fontSize = "0.95em";

      const link = document.createElement("a");
      link.href = book.previewLink || "#";
      link.textContent = "📖 Preview Book";
      link.target = "_blank";
      link.style.display = "inline-block";
      link.style.marginTop = "12px";
      link.style.color = "#ff6666";
      link.style.textDecoration = "none";
      link.style.fontWeight = "bold";

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(author);
      card.appendChild(ratingDiv);
      card.appendChild(desc);
      card.appendChild(link);

      gallary.appendChild(card);
      card.style.opacity = "0";
      setTimeout(() => (card.style.opacity = "1"), 100);
    })
    .catch((err) => {
      console.error(err);
      errorMsg.textContent = "Something went wrong. Please try again.";
      errorMsg.style.display = "block";
    });
});
