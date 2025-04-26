var logEmail = document.querySelector(".logEmail");
var logPass = document.querySelector(".logPass");
var logBtns = document.querySelectorAll(".logbtn");
var errorMsg = document.getElementById("errorMsg");
var toggleBtn = document.querySelector(".show-pass");
var toggleIcon = document.getElementById("toggleIcon");

let accounts = [
  //   {
  //     email: "admin@example.com",
  //     password: "admin123",
  //     role: "admin",
  //   },
  //   {
  //     email: "user@example.com",
  //     password: "user123",
  //     role: "user",
  //   },
];

localStorage.setItem("accounts", JSON.stringify(accounts));

if (localStorage.getItem("accounts") != null) {
  accounts = JSON.parse(localStorage.getItem("accounts"));
}

function logIn(role) {
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

        if (accounts[i].role === "admin") {
          if (role === "admin") {
            window.location.href = "admin.html";
          } else if (role === "user") {
            window.location.href = "Books.html";
          }
        } else if (accounts[i].role === "user") {
          if (role === "user") {
            window.location.href = "Books.html";
          } else {
            errorMsg.innerText = "Users can only log in as user.";
            errorMsg.style.display = "block";
            return;
          }
        }
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
    let role = btn.getAttribute("data-role");
    logIn(role);
  });
});

toggleBtn.addEventListener("click", () => {
  const isHidden = logPass.type === "password";
  logPass.type = isHidden ? "text" : "password";
  toggleIcon.src = isHidden ? "Imgs/view.png" : "Imgs/hide.png";
});
