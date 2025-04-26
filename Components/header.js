const header = {
  getAdminHeader: function () {
    return `<div class="logo">
          <img src="Imgs/Logo.png" alt="" />
          <h2>Books</h2>
        </div>
  
        <div class="nav-side">
          <div class="btns">
            <a href="Books.html" class="home">Home</a>
          </div>
  
          <ul class="nav-links">
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>
  
        <div class="search-bar">
          <img src="Imgs/search-normal.png" class="search-ic" />
          <input
            type="text"
            placeholder="Search for title, author and category"
            id="search-input"
            autocomplete="off"
          />
        </div>
  
        <div class="profile-menu">
          <button class="user"><img src="Imgs/user.png" /></button>
          <div class="profile-menu-content">
            <a href="logout.html">Logout</a>
          </div>
        </div>`;
  },
  getUserHeader: function () {
    return `<div class="logo">
          <img src="Imgs/Logo.png" alt="" />
          <h2>Books</h2>
        </div>
  
        <div class="nav-side">
          <div class="btns">
            <a href="Books.html" class="home">Home</a>
          </div>
  
          <ul class="nav-links">
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="favourites.html">Favourites</a></li>
          </ul>
        </div>
  
        <div class="search-bar">
          <img src="Imgs/search-normal.png" class="search-ic" />
          <input
            type="text"
            placeholder="Search for title, author and category"
            id="search-input"
          />
        </div>
  
        <div class="profile-menu">
          <button class="user">
          <img src="Imgs/user.png" />
          </button>
          <div class="profile-menu-content">
            <a href="profile.html">view profile</a>
            <a href="#" class="logout">Logout</a>
          </div>
        </div>`;
  },
  renderAdminHeader: function (id) {
    document.getElementById(id).innerHTML = this.getAdminHeader();
    this.adminSearchListener();
    this.logOut();
  },

  renderUserHeader: function (id) {
    document.getElementById(id).innerHTML = this.getUserHeader();
    this.userSearchListener();
    this.logOut();
  },

  adminSearchListener: function () {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (event) => {
        const searchVal = event.target.value.toLowerCase();
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const container = document.querySelector('.books-container');
        container.innerHTML = '';

        const filteredBooks = books.filter((book) => {
          return (
            book.title.toLowerCase().includes(searchVal) ||
            book.author.toLowerCase().includes(searchVal)
          );
        });

        const booksToDisplay = searchVal ? filteredBooks : books;

        booksToDisplay.forEach((book) => {
          container.innerHTML += `<div class="book" data-id="${book.id}">
            <img src="Imgs/${book.cover}.jpg" class="book-cover" />
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
      });
    }
  },

  userSearchListener: function () {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (event) => {
        const searchVal = event.target.value.toLowerCase();
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const container = document.querySelector('.books-container');
        container.innerHTML = '';

        const filteredBooks = books.filter((book) => {
          return (
            book.title.toLowerCase().includes(searchVal) ||
            book.author.toLowerCase().includes(searchVal)
          );
        });

        const booksToDisplay = searchVal ? filteredBooks : books;

        booksToDisplay.forEach((book) => {
          container.innerHTML += ``;
        });
      });
    }
  },

  logOut: function () {
    const logout = document.querySelectorAll('.logout');

    logout.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('username');
        location.href = 'index.html';
      });
    });
  },
};

export default header;
