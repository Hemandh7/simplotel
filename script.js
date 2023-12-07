document.addEventListener("DOMContentLoaded", function () {
    const mobileIcon = document.querySelector('.mobile-icon');
    const navbarMenu = document.querySelector('.navbar-menu');

    mobileIcon.addEventListener('click', function () {
        navbarMenu.classList.toggle('active');
    });
});
