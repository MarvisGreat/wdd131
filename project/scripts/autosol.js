document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-btn");
    const navigationLinks = document.getElementById("nav-links");

    menuButton.addEventListener("click", () => {
        navigationLinks.classList.toggle("show-menu");
        menuButton.classList.toggle("active");
    });
});