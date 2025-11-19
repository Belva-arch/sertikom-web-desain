function toggleMenu() {
var menu = document.getElementById('navMenu');
var toggle = document.getElementById('mobileToggle');
            
    if (menu.classList.contains('active')) {
    menu.classList.remove('active');
    toggle.classList.remove('active');
    } else {
    menu.classList.add('active');
    toggle.classList.add('active');
    }}

function closeMenu() {
    var menu = document.getElementById('navMenu');
    var toggle = document.getElementById('mobileToggle');
    menu.classList.remove('active');
    toggle.classList.remove('active');
}

document.getElementById('mobileToggle').onclick = toggleMenu;

    var links = document.querySelectorAll('.nav-menu a');
    for (var i = 0; i < links.length; i++) {
    links[i].onclick = closeMenu;
}