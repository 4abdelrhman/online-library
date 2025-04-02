const header = {
  getHTML: function () {
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
        <li><a href="#">Properties</a></li>
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
  render: function (id) {
    document.getElementById(id).innerHTML = this.getHTML();
  },
};

export default header;
