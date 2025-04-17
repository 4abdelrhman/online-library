const favIcons = document.getElementsByClassName('fav-btn');

for (let i = 0; i < favIcons.length; i++) {
  favIcons[i].addEventListener('click', () => {
    const img = favIcons[i].querySelector('img');
    if (img.src.includes('linear')) {
      img.src = './Imgs/Style=bold.png';
    } else {
      img.src = './Imgs/Style=linear.png';
    }
  });
}

function showDetails() {
  const popup = document.getElementById('edit-popup');
  popup.style.display = 'block';
}

function closePopup() {
  const popup = document.getElementById('edit-popup');
  popup.style.display = 'none';
}
