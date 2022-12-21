//! Script da Navbar Mobile
//* Definição dos elementos da navbar mobile:
const navbar = document.getElementById("navbar-default");
const button = document.getElementById("navbar-button");
const icon_open = document.getElementById("icon-menu");
const icon_close = document.getElementById("icon-close");

//* Define uma evento quando o botão é clicado:
button.addEventListener("click", () => {
    //? Alterna o elemento hidden dos elementos:
    navbar.classList.toggle("hidden");
    icon_menu.classList.toggle("hidden");
    icon_close.classList.toggle("hidden");
});
