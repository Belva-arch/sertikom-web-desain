// Navbar scroll effect
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const posisi = window.scrollY > 0;
    navbar.classList.toggle("scrolling-active", posisi);
});

// Fungsi untuk menampilkan popup
function showPopup(title, message) {
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-message").innerText = message;

    const popup = document.getElementById("popup");
    popup.classList.add("active");

    // Auto-close after 5s
    setTimeout(() => {
        closePopup();
    }, 5000);
}

function closePopup() {
    document.getElementById("popup").classList.remove("active");
}

// Fungsi untuk membuka popup paket
function openPackagePopup(packageName, packagePrice) {
    document.getElementById("selectedPackage").value = packageName;
    document.getElementById("packagePrice").value = packagePrice;
    document.getElementById("packageName").value = packageName + " - Rp " + packagePrice;
    document.getElementById("packageTitle").innerText = "Pesan Paket: " + packageName;
    
    const popup = document.getElementById("packagePopup");
    popup.classList.add("active");
    
    // Reset form
    document.getElementById("packageForm").reset();
}

// Fungsi untuk menutup popup paket
function closePackagePopup() {
    document.getElementById("packagePopup").classList.remove("active");
}

// Handle form kontak utama
document.addEventListener('DOMContentLoaded', function() {
    // Form kontak
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            
            if (!fullName || !email || !message) {
                showPopup("Peringatan", "Harap isi semua field yang wajib diisi.");
                return;
            }
            
            // Simulasi pengiriman
            setTimeout(() => {
                showPopup("Berhasil!", "Pesan Anda berhasil dikirim! Kami akan membalas dalam 1-2 hari kerja.");
                this.reset();
            }, 1000);
        });
    }
    
    // Form paket
    const packageForm = document.getElementById("packageForm");
    if (packageForm) {
        packageForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const packageName = document.getElementById("selectedPackage").value;
            const fullName = document.getElementById("packageFullName").value;
            const email = document.getElementById("packageEmail").value;
            const phone = document.getElementById("packagePhone").value;
            const company = document.getElementById("packageCompany").value;
            const message = document.getElementById("packageMessage").value;
            
            // Validasi
            if (!fullName || !email || !phone) {
                showPopup("Peringatan", "Harap isi semua field yang wajib diisi.");
                return;
            }
            
            // Simulasi pengiriman data
            setTimeout(() => {
                closePackagePopup();
                showPopup("Berhasil!", 
                    `Pesanan paket ${packageName} berhasil dikirim!\nTim kami akan menghubungi Anda melalui WhatsApp dalam 1x24 jam.\nEmail konfirmasi telah dikirim ke ${email}`);
                
                // Reset form kontak juga
                if (contactForm) contactForm.reset();
            }, 1000);
        });
    }
    
    // Tambahkan event listener untuk tombol Pilih Paket
    const packageButtons = document.querySelectorAll('.pricing-btn');
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Dapatkan nama dan harga paket
            const card = this.closest('.pricing-card');
            const packageName = card.querySelector('.pricing-header h3').innerText;
            const packagePrice = card.querySelector('.amount').innerText;
            
            openPackagePopup(packageName, packagePrice);
        });
    });
    
    // Smooth scroll untuk navbar
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Tutup navbar di mobile
                    const navbarCollapse = document.querySelector('.navbar-collapse.show');
                    if (navbarCollapse) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });
    
    // Smooth scroll untuk footer links
    document.querySelectorAll('.footer-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});