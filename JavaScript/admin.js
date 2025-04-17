function addBook() {
  const container = document.querySelector('.books-container');
  container.innerHTML += `<div class="book">
        <img src="Imgs/bookCover1.jpg" class="book-cover" />
        <div class="book-side">
          <div class="title">
            <h2>Little Women</h2>
            <button class="edit-book" onclick="editBook()">
              <img src="Imgs/editing.png" class="edit-icon" />
            </button>
          </div>
          <h4 class="auther">Louisa May Alcott</h4>
          <p class="discrebtion">
            Little Women follows the four March sisters—Jo, Beth, Meg, and Amy—as they navigate life, love, and personal...
          </p>
          <div class="id">
            <p>ID: 200</p>
          </div>
          <button class="remove" id="delete-book" onclick="deleteBook()">Delete Book</button>
        </div>
      </div>`;
}

function deleteBook() {
  const deleteBtn = document.querySelectorAll('#delete-book');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.parentElement.parentElement.remove();
    });
  });
}

function editBook() {
  const popup = document.getElementById('edit-popup');
  popup.style.display = 'block';
}

function closePopup() {
  const popup = document.getElementById('edit-popup');
  popup.style.display = 'none';
}
