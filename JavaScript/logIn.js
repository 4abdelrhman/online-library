// Get DOM elements
var logEmail = document.querySelector(".logEmail");
var logPass = document.querySelector(".logPass");
var logBtns = document.querySelectorAll(".logbtn");
var errorMsg = document.getElementById("errorMsg");
var toggleBtn = document.querySelector(".show-pass");
var toggleIcon = document.getElementById("toggleIcon");

let accounts = [];

if (localStorage.getItem("accounts") != null) {
  accounts = JSON.parse(localStorage.getItem("accounts"));
}

function logIn() {
  let email = logEmail.value.trim();
  let pass = logPass.value.trim();
  let found = false;

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].email === email) {
      found = true;

      if (accounts[i].password === pass) {
        let temp = accounts[0];
        accounts[0] = accounts[i];
        accounts[i] = temp;

        localStorage.setItem("accounts", JSON.stringify(accounts));

        localStorage.setItem("username", accounts[0].username);

        window.location.href = "Books.html";
        return;
      } else {
        errorMsg.innerText = "Incorrect password.";
        errorMsg.style.display = "block";
        return;
      }
    }
  }

  if (!found) {
    errorMsg.innerText = "We do not have this account.";
    errorMsg.style.display = "block";
  }
}

logBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    errorMsg.style.display = "none";
    logIn();
  });
});

toggleBtn.addEventListener("click", () => {
  const isHidden = logPass.type === "password";
  logPass.type = isHidden ? "text" : "password";
  toggleIcon.src = isHidden ? "Imgs/view.png" : "Imgs/hide.png";
});
