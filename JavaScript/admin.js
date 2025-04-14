function addBook() {
  const container = document.querySelector('.books-container');
  container.innerHTML += `<div class="book">
        <img src="Imgs/81F90H7hnML.jpg" class="book-cover" />
        <div class="book-side">
          <div class="title">
            <h2>Atomic Habits</h2>
            <button class="edit-book" onclick="editBook()">
              <img src="Imgs/editing.png" class="edit-icon" />
            </button>
          </div>
          <h4 class="auther">James Clear</h4>
          <p class="discrebtion">
            A guide to forming good habits and breaking bad ones through small,
            consistent changes over time.
          </p>
          <div class="id">
            <p>ID: 101</p>
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


