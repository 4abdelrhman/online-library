// Function to generate a sequential ID for each book
function generateBookId() {
  // Get existing books from local storage
  const books = JSON.parse(localStorage.getItem('books')) || [];

  // If there are no books, start with ID 1
  if (books.length === 0) {
    return 1;
  }

  // Create an array of the ids in the books and get the max num of it
  // Then increment this id by 1
  const maxId = Math.max(...books.map((book) => parseInt(book.id)));
  return maxId + 1;
}

// Function to load books from local storage
async function loadBooksFromStorage() {
  const container = document.querySelector('.books-container');
  container.innerHTML = '';

  try {
    const response = await fetch('/api/books/');
    const books = await response.json();
    books.forEach((book) => {
      container.innerHTML += `<div class="book" data-id="${book.id}">
        <img src="${book.cover}" class="book-cover" />
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
  } catch (error) {
    console.error('Faild to load books:', error);
  }
}

// Load books when the page loads
document.addEventListener('DOMContentLoaded', loadBooksFromStorage);

function addBook() {
  document.getElementById('add-book-popup').style.display = 'block';
}

function closeAddBookPopup() {
  document.getElementById('add-book-popup').style.display = 'none';
}

document
  .getElementById('book-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    const book = {
      title: document.getElementById('book-title').value,
      author: document.getElementById('book-author').value,
      description: document.getElementById('book-description').value,
      cover: document.getElementById('book-cover').value,
    };

    try {
      await fetch('/api/books/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      await loadBooksFromStorage();
      closeAddBookPopup();
      this.reset();
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  });

async function deleteBook(button) {
  const bookElement = button.closest('.book');
  const bookId = bookElement.getAttribute('data-id');
  try {
    await fetch(`/api/books/${bookId}/`, { method: 'DELETE' });
    await loadBooksFromStorage();
  } catch (error) {
    console.error('Faild To delete book:', error);
  }
}

let currentBook = null;
function editBook(button) {
  // get the nearest parent with class book
  const bookElement = button.closest('.book');
  const bookId = bookElement.getAttribute('data-id');
  const popup = document.getElementById('edit-popup');
  currentBook = bookElement;
  // Get the book details
  const title = bookElement.querySelector('.title h2').textContent;
  const author = bookElement.querySelector('.auther').textContent;
  const description = bookElement.querySelector('.description').textContent;
  const coverImg = bookElement.querySelector('.book-cover').src;
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

document
  .getElementById('edit-form')
  .addEventListener('submit', async function (e) {
    // Prevent the page from refreshing
    e.preventDefault();
    if (!currentBook) return;

    const bookId = this.getAttribute('data-book-id');
    const updatedBook = {
      title: document.getElementById('edit-title').value,
      author: document.getElementById('edit-author').value,
      description: document.getElementById('edit-description').value,
      cover: document.getElementById('edit-cover').src,
    };

    try {
      await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });
      await loadBooksFromStorage();
      closePopup();
      currentBook = null;
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  });
