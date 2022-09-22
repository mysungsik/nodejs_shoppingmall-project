const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-view")

function showMobileMenu(){
    mobileMenu.classList.toggle("open")

}

mobileMenuBtn.addEventListener("click",showMobileMenu)