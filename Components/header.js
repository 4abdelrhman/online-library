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
            <a href="#" class="logout">Logout</a>
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
        const borrowedBooks =
          JSON.parse(localStorage.getItem('borrowedBooks')) || [];
        let favBooks = JSON.parse(localStorage.getItem('favBooks')) || [];

        const container = document.querySelector('.books-container');
        container.innerHTML = '';

        const filteredBooks = books.filter((book) => {
          return (
            book.title.toLowerCase().includes(searchVal) ||
            book.author.toLowerCase().includes(searchVal)
          );
        });

        const booksToDisplay = searchVal ? filteredBooks : books;

        const isFav = (id) => {
          return favBooks.some((item) => item.id == id);
        };

        booksToDisplay.forEach((element) => {
          let book = document.createElement('div');
          book.className = 'book-info';
          book.dataset.dataIndex = element.id;
          book.innerHTML = `<div class="cover-container">
              <img src="${element.coverImg}" alt="book cover" class="cover" />
            </div>
            <div class="text-info">
              <div class="title">
                <h4>${element.title}</h4>
                <img src="${
                  isFav(element.id)
                    ? './Imgs/Style=bold.png'
                    : './Imgs/Style=linear.png'
                }" 
                data-index="${element.id}"
                alt="fav icon" class="fav" />
              </div>
              <p class="author">${element.author}</p>
              <p class="descreption">${element.description}</p>
              <div class="buttons">
                <button class="details" onclick="detailsBook(this)">View Details</button>
                <button class="${
                  borrowedBooks.some((item) => item.id == element.id)
                    ? 'disabled-borrow'
                    : 'borrow'
                }" data-index="${element.id}">
                  ${
                    borrowedBooks.some((item) => item.id == element.id)
                      ? 'Borrowed'
                      : 'Borrow Book'
                  }
                </button>
              </div>
            </div>`;

          container.appendChild(book);
        });

        // re-add event listeners
        document.querySelectorAll('.borrow').forEach((item) => {
          item.addEventListener('click', (e) => {
            const bookId = e.target.getAttribute('data-index');
            let borrowedBooks =
              JSON.parse(window.localStorage.getItem('borrowedBooks')) || [];
            let exist = borrowedBooks.some((item) => item.id == bookId);
            const bookToBorrow = books.find((item) => bookId == item.id);
            if (!exist) {
              borrowedBooks.push(bookToBorrow);
              window.localStorage.setItem(
                'borrowedBooks',
                JSON.stringify(borrowedBooks)
              );
            }
            e.target.className = 'disabled-borrow';
            e.target.innerHTML = 'Borrowed';
          });
        });

        document.querySelectorAll('.fav').forEach((item) => {
          item.addEventListener('click', (e) => {
            let id = e.target.getAttribute('data-index');
            const book = books.find((item) => id == item.id);
            let existInFavs = JSON.parse(
              window.localStorage.getItem('favBooks')
            ).some((item) => item.id == id);
            if (existInFavs) {
              favBooks = favBooks.filter((item) => item.id != id);
              window.localStorage.setItem('favBooks', JSON.stringify(favBooks));
              e.target.src = './Imgs/Style=linear.png';
            } else {
              favBooks.push(book);
              window.localStorage.setItem('favBooks', JSON.stringify(favBooks));
              e.target.src = './Imgs/Style=bold.png';
            }
          });
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
