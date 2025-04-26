// Function to generate a sequential ID for each book
function generateBookId() {
  // Get existing books from local storage
  const books = JSON.parse(localStorage.getItem('books')) || [];

  // If there are no books, start with ID 1
  if (books.length === 0) {
    return 1;
  }

  // Find the highest ID and increment by 1
  const maxId = Math.max(...books.map((book) => parseInt(book.id)));
  return maxId + 1;
}

// Function to load books from local storage
function loadBooksFromStorage() {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const container = document.querySelector('.books-container');

  container.innerHTML = '';

  books.forEach((book) => {
    container.innerHTML += `<div class="book" data-id="${book.id}">
      <img src="${book.coverImg}" class="book-cover" />
      <div class="book-side">
        <div class="title">
          <h2>${book.title}</h2>
          <button class="edit-book" onclick="editBook(this)">
            <img src="Imgs/editing.png" class="edit-icon" />
          </button>
        </div>
        <h4 class="auther">${book.author}</h4>
        <p class="description">${book.description}</p>
          <div class="id">
            <p>ID:${book.id}</p>
          </div>
        <button class="remove" onclick="deleteBook(this)">Delete Book</button>
      </div>
    </div>`;
  });
}

// Load books when the page loads
document.addEventListener('DOMContentLoaded', loadBooksFromStorage);

function addBook() {
  document.getElementById('add-book-popup').style.display = 'block';
}

function closeAddBookPopup() {
  document.getElementById('add-book-popup').style.display = 'none';
}

document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const description = document.getElementById('book-description').value;
  const coverImg = document.getElementById('book-cover').value;

  // Create a new book object with a unique ID
  const book = {
    id: generateBookId(),
    title,
    author,
    description,
    coverImg,
  };
  console.log(book.coverImg);
  
  // Get existing books from local storage
  const books = JSON.parse(localStorage.getItem('books')) || [];

  // Add the new book to the array
  books.push(book);

  // Save the updated books array to local storage
  localStorage.setItem('books', JSON.stringify(books));

  // Reload books from storage to display the new book
  loadBooksFromStorage();

  // Close the form and reset it
  closeAddBookPopup();
  document.getElementById('book-form').reset();
});

function deleteBook(button) {
  const bookElement = button.closest('.book');
  const bookId = bookElement.getAttribute('data-id');

  // Remove from DOM
  bookElement.remove();

  // Remove from local storage
  const books = JSON.parse(localStorage.getItem('books')) || [];
  // Convert both IDs to strings for comparison to ensure they match regardless of type
  const updatedBooks = books.filter(
    (book) => String(book.id) !== String(bookId)
  );
  localStorage.setItem('books', JSON.stringify(updatedBooks));

  // Log for debugging
  console.log(`Deleted book with ID: ${bookId}`);
  console.log(`Remaining books: ${updatedBooks.length}`);
}

let currentBook = null;
function editBook(button) {
  const bookElement = button.closest('.book');
  const bookId = bookElement.getAttribute('data-id');
  const popup = document.getElementById('edit-popup');
  currentBook = bookElement;

  // Get the book details
  const title = bookElement.querySelector('.title h2').textContent;
  const author = bookElement.querySelector('.auther').textContent;
  const description = bookElement.querySelector('.description').textContent;
  const coverImg = bookElement.querySelector('.book-cover').src;

  // Extract the cover filename from the src
  const cover = coverImg.split('/').pop().replace('.jpg', '');

  // Set the values in the edit form
  document.getElementById('edit-title').value = title;
  document.getElementById('edit-author').value = author;
  document.getElementById('edit-description').value = description;
  document.getElementById('edit-cover').src = coverImg;

  // Store the book ID for later use
  document.getElementById('edit-form').setAttribute('data-book-id', bookId);

  // Show the popup
  popup.style.display = 'block';
}

function closePopup() {
  const popup = document.getElementById('edit-popup');
  popup.style.display = 'none';
}

document.getElementById('edit-form').addEventListener('submit', function (e) {
  e.preventDefault();

  if (!currentBook) return;

  const bookId = this.getAttribute('data-book-id');
  const newTitle = document.getElementById('edit-title').value;
  const newAuthor = document.getElementById('edit-author').value;
  const newDescription = document.getElementById('edit-description').value;
  const newCoverImg = document.getElementById('edit-cover').src;

  // Extract the cover filename from the src
  const newCover = newCoverImg.split('/').pop().replace('.jpg', '');

  // Update the book card in the DOM
  currentBook.querySelector('h2').textContent = newTitle;
  currentBook.querySelector('.auther').textContent = newAuthor;
  currentBook.querySelector('.description').textContent = newDescription;
  currentBook.querySelector('.book-cover').src = newCoverImg;

  // Update the book in local storage
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const updatedBooks = books.map((book) => {
    // Convert both IDs to strings for comparison to ensure they match regardless of type
    if (String(book.id) === String(bookId)) {
      return {
        ...book,
        title: newTitle,
        author: newAuthor,
        description: newDescription,
        cover: newCover,
      };
    }
    return book;
  });

  localStorage.setItem('books', JSON.stringify(updatedBooks));

  // Hide the popup and reset state
  closePopup();
  currentBook = null;
});
