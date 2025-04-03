const header = {
  getAdminHeader: function () {
    return `<div class="logo">
        <img src="Imgs/Logo.png" alt="" />
        <h2>Books</h2>
      </div>

      <div class="btns">
        <a href="#" class="home">Home</a>
        <a href="#" class="exp"
          >Explor <img src="Imgs/down-arrow.png" alt=""
        /></a>
      </div>

      <ul class="nav-links">
        <li><a href="#">Favorites</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">FAQ'S</a></li>
        <li><a href="#">Contact us</a></li>
      </ul>

      <div>
        <button class="user"><img src="Imgs/user.png" /></button>
        <button class="setting"><img src="Imgs/settings.png" /></button>
      </div>`;
  },
  getUserHeader: function () {
    return `<div class="logo">
        <img src="Imgs/Logo.png" alt="" />
        <h2>Books</h2>
      </div>

      <div class="nav-side">
        <div class="btns">
          <a href="#" class="home">Home</a>
        </div>

        <ul class="nav-links">
          <li><a href="#">Services</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Favourites</a></li>
        </ul>
      </div>

      <div class="search-bar">
        <img src="Imgs/search-normal.png" class="search-ic" />
        <input
          type="text"
          placeholder="Search for title, author and category"
        />
      </div>

      <div>
        <button class="user"><img src="Imgs/user.png" /></button>
      </div>`;
  },
  renderAdminHeader: function (id) {
    document.getElementById(id).innerHTML = this.getAdminHeader();
  },
  renderUserHeader: function (id) {
    document.getElementById(id).innerHTML = this.getUserHeader();
  },
};

export default header;
