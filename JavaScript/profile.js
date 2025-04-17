const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

if (borrowedBooks.length === 0) {
  borrowedDiv.innerHTML = "<p>You haven't borrowed any books yet.</p>";
} else {
  borrowedBooks.forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `<h3>${book.title}</h3>`;
    borrowedDiv.appendChild(bookDiv);
  });
}
