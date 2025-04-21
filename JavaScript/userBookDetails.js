document.addEventListener("DOMContentLoaded", () => {
  const bookContainer = document.getElementById("book-container");

  const book = {
    id: 200,
    title: "Little Women",
    author: "Louisa May Alcott",
    description: `Little Women follows the four March sisters—Jo, Beth, Meg, and Amy—as they navigate life, love`,
    coverImg: "Imgs/bookCover1.jpg",
  };

  bookContainer.innerHTML = `
    <div class="book" data-id="${book.id}">
      <img src="${book.coverImg}" alt="${book.title}" class="book-cover" />
      <div class="book-details">
        <div class="book-title"><h2>${book.title}</h2></div>
        <h4 class="author">${book.author}</h4>
        <p class="description">${book.description}</p>
        <div class="book-id"><p>ID: ${book.id}</p></div>
        <div class="buttons">
          <button class="fav-btn">Add to Favorites</button>
          <button class="borrow-btn">Borrow</button>
        </div>
      </div>
    </div>
  `;

  const favBtn = document.querySelector(".fav-btn");
  const borrowBtn = document.querySelector(".borrow-btn");

  function isBookInStorage(key) {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    return list.some((b) => b.id === book.id);
  }

  function updateStorage(key, add = true) {
    let list = JSON.parse(localStorage.getItem(key)) || [];
    if (add) {
      list.push(book);
    } else {
      list = list.filter((b) => b.id !== book.id);
    }
    localStorage.setItem(key, JSON.stringify(list));
  }

  function updateButtonState() {
    if (isBookInStorage("favBooks")) {
      favBtn.textContent = "Added to Favorites";
    } else {
      favBtn.textContent = "Add to Favorites";
    }

    if (isBookInStorage("borrowedBooks")) {
      borrowBtn.textContent = "Borrowed";
    } else {
      borrowBtn.textContent = "Borrow";
    }
  }

  function handleClick(key, button, addedText, defaultText) {
    const alreadyAdded = isBookInStorage(key);

    if (alreadyAdded) {
      const confirmRemove = confirm(
        `This book is already ${addedText.toLowerCase()}. Do you want to remove it?`
      );
      if (confirmRemove) {
        updateStorage(key, false);
        button.textContent = defaultText;
      }
    } else {
      updateStorage(key, true);
      button.textContent = addedText;
    }
  }

  favBtn.addEventListener("click", () => {
    handleClick("favBooks", favBtn, "Added to Favorites", "Add to Favorites");
  });

  borrowBtn.addEventListener("click", () => {
    handleClick("borrowedBooks", borrowBtn, "Borrowed", "Borrow");
  });

  updateButtonState();
});
