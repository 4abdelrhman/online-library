// Get DOM elements
const logEmail = document.querySelector('.logEmail');
const logPass = document.querySelector('.logPass');
const logBtns = document.querySelectorAll('.logbtn'); // Two buttons
const errorMsg = document.getElementById('errorMsg');
const toggleBtn = document.querySelector('.show-pass');
const toggleIcon = document.getElementById('toggleIcon');

// Load accounts from localStorage
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

function logIn(targetPage) {
  const email = logEmail.value.trim();
  const password = logPass.value.trim();

  const account = accounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (account) {
    localStorage.setItem('username', account.username);

    location.href = targetPage;
  } else {
    errorMsg.innerText = 'Incorrect email or password.';
    errorMsg.style.display = 'block';
  }
}

logBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    errorMsg.style.display = 'none';

    const role = btn.getAttribute('data-role');

    if (role === 'admin') {
      logIn('Admin.html');
    } else if (role === 'user') {
      logIn('Books.html');
    }
  });
});

toggleBtn.addEventListener('click', () => {
  const isHidden = logPass.type === 'password';
  logPass.type = isHidden ? 'text' : 'password';
  toggleIcon.src = isHidden ? 'Imgs/view.png' : 'Imgs/hide.png';
});
