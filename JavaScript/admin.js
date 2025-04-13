let container = document.querySelector('.books-container');
let addBook = document.querySelector('.add-books');

addBook.addEventListener('click', function () {
  container.innerHTML += `<div class="book">
        <img src="Imgs/81F90H7hnML.jpg" class="book-cover" />
        <div class="book-side">
          <div class="title">
            <h2>Atomic Habits</h2>
            <button>
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

          <button class="remove">Delete Book</button>
        </div>
      </div>`;
});

container.addEventListener('click', function (e) {
  if (e.target.classList.contains('remove') || e.target.closest('.remove')) {
    const bookDiv = e.target.closest('.book');
    if (bookDiv) {
      bookDiv.remove();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const editButtons = document.querySelectorAll('#edit-book');
  const popup = document.getElementById('edit-popup');
  const closeBtn = document.getElementById('close-popup');

  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      popup.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });
});
