// array of books
const fromBack = [
  {
    author: "Louisa May Alcott",
    coverImg: "Imgs/bookCover1.jpg",
    description:
      "Little Women follows the four March sisters—Jo, Beth, Meg, and Amy—as they navigate life, love",
    id: 200,
    title: "Little Women",
  },
  {
    author: "Louisa May Alcott",
    coverImg: "Imgs/bookCover1.jpg",
    description:
      "Little Women follows the four March sisters—Jo, Beth, Meg, and Amy—as they navigate life, love",
    id: 201,
    title: "Little Women2",
  },
  {
    author: "Louisa May Alcott",
    coverImg: "Imgs/bookCover1.jpg",
    description:
      "Little Women follows the four March sisters—Jo, Beth, Meg, and Amy—as they navigate life, love",
    id: 202,
    title: "Little Women3",
  },
];

if (!window.localStorage.getItem("borrowedBooks")) {
  window.localStorage.setItem("borrowedBooks", "[]");
}

if (!window.localStorage.getItem("favBooks")) {
  window.localStorage.setItem("favBooks", "[]");
}
window.localStorage.setItem("books", JSON.stringify(fromBack));

let allBooks = JSON.parse(window.localStorage.getItem("books"));

let bookContainer = document.getElementById("books-container");

let favBooks = JSON.parse(window.localStorage.getItem("favBooks"));

const isFav = (searchId) => {
  return favBooks.some((item) => searchId === item.id);
};


allBooks.forEach((element) => {
  let book = document.createElement("div");
  book.className = "book-info";
  book.innerHTML = `<div class="cover-container">
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
            <button class="borrow"
              data-index = ${element.id} >
             Borrow Book
            </button>
          </div>
        </div>`;
  bookContainer.appendChild(book);
});

document.querySelectorAll(".borrow").forEach((item) => {
  item.addEventListener("click", (e) => {
    const bookId = e.target.getAttribute("data-index");
    let borrwedBooks = JSON.parse(window.localStorage.getItem("borrowedBooks"));
    console.log(borrwedBooks);
    let exist = borrwedBooks.some((item) => item.id == bookId);
    const bookToBorrow = allBooks.find((item) => bookId == item.id);
    if (!exist) {
      console.log(borrwedBooks.length);
      borrwedBooks.push(bookToBorrow);
      window.localStorage.setItem(
        "borrowedBooks",
        JSON.stringify(borrwedBooks)
      );
    }
  });
});

document.querySelectorAll(".fav").forEach((item) => {
  item.addEventListener("click", (e) => {
    let id = e.target.getAttribute("data-index");
    console.log(id);
    const book = allBooks.find((item) => id == item.id);
    console.log(book);
    let existInFavs = JSON.parse(window.localStorage.getItem("favBooks")).some((item) => item.id == id);
    console.log(existInFavs);
    if (existInFavs) {
      favBooks = favBooks.filter((item) => item.id != id);
      window.localStorage.setItem("favBooks", JSON.stringify(favBooks.filter((item) => item.id != id)));
      e.target.src = "../Imgs/Style=linear.png";
    } else {
      favBooks.push(book);
      window.localStorage.setItem("favBooks", JSON.stringify(favBooks));
      e.target.src = "../Imgs/Style=bold.png";
    }
  });
});
