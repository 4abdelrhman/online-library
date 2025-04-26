let favBooks = JSON.parse(window.localStorage.getItem("favBooks"));
let allBooks = JSON.parse(window.localStorage.getItem("books"));

const isFav = (searchId) => {
  return favBooks.some((item) => searchId === item.id);
};

favBooks.forEach((element) => {
  let bookContainer = document.createElement("div");
  bookContainer.className = "book-info";
  bookContainer.innerHTML = `<div class="cover-container">
          <img src= ${element.coverImg} alt="book cover" class="cover" />
        </div>
        <div class="text-info">
          <div class="title">
            <h4>${element.title}</h4>
            <img src= ${
              isFav(element.id)
                ? "../Imgs/Style=bold.png"
                : "../Imgs/Style=linear.png"
            } 
            data-index = ${element.id}
            alt="fav icon" class="fav" />
          </div>
          <p class="author">${element.author}</p>
          <p class="descreption">
           ${element.description}
          </p>
          <div class="buttons">
            <a href="userBookDetails.html">
              <button class="details">View Details</button>
            </a>
            <button class= ${
              JSON.parse(window.localStorage.getItem("borrowedBooks")).some(
                (item) => item.id == element.id
              )
                ? "disabled-borrow"
                : "borrow"
            }
              data-index = ${element.id}
              >
              ${
                JSON.parse(window.localStorage.getItem("borrowedBooks")).some(
                  (item) => item.id == element.id
                )
                  ? "Borrowed"
                  : "Borrow Book"
              }
            </button>
          </div>
        </div>`;
  document.querySelector(".grid-container").appendChild(bookContainer);
});

document.querySelectorAll(".borrow").forEach((item) => {
  item.addEventListener("click", (e) => {
    const bookId = e.target.getAttribute("data-index");
    let borrwedBooks = JSON.parse(window.localStorage.getItem("borrowedBooks"));
    let exist = borrwedBooks.some((item) => item.id == bookId);
    const bookToBorrow = allBooks.find((item) => bookId == item.id);
    if (!exist) {
      borrwedBooks.push(bookToBorrow);
      window.localStorage.setItem(
        "borrowedBooks",
        JSON.stringify(borrwedBooks)
      );
    }
    e.target.className = "disabled-borrow";
    item.innerHTML = "Borrowed";
  });
});

document.querySelectorAll(".fav").forEach((item) => {
  item.addEventListener("click", (e) => {
    let id = e.target.getAttribute("data-index");
    const book = allBooks.find((item) => id == item.id);
    let existInFavs = JSON.parse(window.localStorage.getItem("favBooks")).some(
      (item) => item.id == id
    );
    if (existInFavs) {
      favBooks = favBooks.filter((item) => item.id != id);
      window.localStorage.setItem(
        "favBooks",
        JSON.stringify(favBooks.filter((item) => item.id != id))
      );
      e.target.src = "../Imgs/Style=linear.png";
    } else {
      favBooks.push(book);
      window.localStorage.setItem("favBooks", JSON.stringify(favBooks));
      e.target.src = "../Imgs/Style=bold.png";
    }
  });
});
