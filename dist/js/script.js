// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const isScrolled = window.scrollY > 0;
    navbar.classList.toggle("scrolling-active", isScrolled);
    
    // Update active nav link berdasarkan posisi scroll
    updateActiveNavLink();
});

// ============================================
// FUNGSI POPUP UTAMA
// ============================================
function showPopup(title, message) {
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-message").innerText = message;

    const popup = document.getElementById("popup");
    popup.classList.add("active");

    // Auto-close setelah 5 detik
    setTimeout(() => {
        closePopup();
    }, 5000);
}

function closePopup() {
    document.getElementById("popup").classList.remove("active");
}

// ============================================
// DATA FITUR PAKET
// ============================================
const packageFeatures = {
    "Starter": [
        "Konsultasi strategi digital dasar",
        "Analisis kompetitor", 
        "Website audit",
        "Social media setup (2 platform)",
        "2x meeting per bulan",
        "Email support",
        "✗ Content marketing",
        "✗ SEO optimization",
        "✗ Dedicated account manager"
    ],
    "Professional": [
        "✓ Semua fitur Starter",
        "Strategi digital komprehensif",
        "Content marketing plan",
        "SEO optimization", 
        "Social media (4 platform)",
        "4x meeting per bulan",
        "Priority support",
        "Monthly report & analytics",
        "✗ Dedicated account manager"
    ],
    "Enterprise": [
        "✓ Semua fitur Professional",
        "Dedicated account manager",
        "Custom digital strategy", 
        "Full-stack development support",
        "Advanced analytics & BI",
        "Unlimited meetings",
        "24/7 priority support",
        "Quarterly business review",
        "Training & workshop"
    ]
};

// ============================================
// POPUP PAKET HORIZONTAL
// ============================================
function openPackagePopup(packageName, packagePrice) {
    // Set data paket
    document.getElementById("selectedPackage").value = packageName;
    document.getElementById("packagePrice").value = packagePrice;
    document.getElementById("popupPackageName").innerText = packageName + " Package";
    document.getElementById("popupPackagePrice").innerText = "Rp " + packagePrice;
    
    // Update daftar fitur sesuai paket
    updatePackageFeatures(packageName);
    
    // Tampilkan popup
    const popup = document.getElementById("packagePopup");
    popup.classList.add("active");
    
    // Reset form
    document.getElementById("packageForm").reset();
    
    // Fokus ke input pertama
    setTimeout(() => {
        document.getElementById("packageFullName").focus();
    }, 300);
}

function updatePackageFeatures(packageName) {
    const featuresList = document.getElementById("popupPackageFeatures");
    featuresList.innerHTML = '';
    
    const features = packageFeatures[packageName] || [];
    
    features.forEach(feature => {
        const li = document.createElement('li');
        
        // Cek jika fitur termasuk atau tidak
        if (feature.includes('✓') || feature.includes('Semua fitur')) {
            li.classList.add('feature-included');
        } else if (feature.includes('✗')) {
            li.classList.add('feature-excluded');
        }
        
        li.textContent = feature;
        featuresList.appendChild(li);
    });
}

function closePackagePopup() {
    document.getElementById("packagePopup").classList.remove("active");
}

// ============================================
// UPDATE ACTIVE NAV LINK (SCROLL DETECTION)
// ============================================
function updateActiveNavLink() {
    const sections = [
        { id: 'beranda', element: document.querySelector('.hero') },
        { id: 'tentang', element: document.querySelector('.visidigital-section') },
        { id: 'keunggulan', element: document.querySelector('.keunggulan-section') },
        { id: 'pricing', element: document.querySelector('.pricing-section') },
        { id: 'layanan', element: document.querySelector('.porto') },
        { id: 'kontak', element: document.querySelector('.contact-section') }
    ];
    
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    let currentSectionId = '';
    
    // Cari section yang sedang di-view
    sections.forEach(section => {
        if (section.element) {
            const rect = section.element.getBoundingClientRect();
            // Jika 1/3 dari element terlihat di viewport
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSectionId = section.id;
            }
        }
    });
    
    // Update class active di navbar
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSectionId) {
            link.classList.add('active');
        }
    });
}

// ============================================
// FORM HANDLERS
// ============================================
function setupContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            // Validasi
            if (!fullName || !email || !message) {
                showPopup("Peringatan", "Harap isi semua field yang wajib diisi.");
                return;
            }
            
            if (!validateEmail(email)) {
                showPopup("Peringatan", "Format email tidak valid.");
                return;
            }
            
            // Simulasi pengiriman
            setTimeout(() => {
                showPopup("Berhasil!", "Pesan Anda berhasil dikirim! Kami akan membalas dalam 1-2 hari kerja.");
                this.reset();
            }, 1000);
        });
    }
}

function setupPackageForm() {
    const packageForm = document.getElementById("packageForm");
    if (packageForm) {
        packageForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const packageName = document.getElementById("selectedPackage").value;
            const fullName = document.getElementById("packageFullName").value.trim();
            const email = document.getElementById("packageEmail").value.trim();
            const phone = document.getElementById("packagePhone").value.trim();
            
            // Validasi
            if (!fullName || !email || !phone) {
                showPopup("Peringatan", "Harap isi semua field yang wajib diisi.");
                return;
            }
            
            if (!validateEmail(email)) {
                showPopup("Peringatan", "Format email tidak valid.");
                return;
            }
            
            if (!validatePhone(phone)) {
                showPopup("Peringatan", "Format nomor telepon tidak valid.");
                return;
            }
            
            // Simulasi pengiriman data
            setTimeout(() => {
                closePackagePopup();
                showPopup("Berhasil!", 
                    `Pesanan paket ${packageName} berhasil dikirim!\nTim kami akan menghubungi Anda melalui WhatsApp dalam 1x24 jam.\nEmail konfirmasi telah dikirim ke ${email}`);
            }, 1000);
        });
    }
}

// ============================================
// VALIDASI FORM
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Minimal 10 digit, maksimal 15 digit
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
}

// ============================================
// SETUP EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Tombol Pilih Paket
    const packageButtons = document.querySelectorAll('.pricing-btn');
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.pricing-card');
            const packageName = card.querySelector('.pricing-header h3').innerText;
            const packagePrice = card.querySelector('.amount').innerText;
            
            openPackagePopup(packageName, packagePrice);
        });
    });
    
    // Smooth scroll untuk navbar links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Update active state manual (untuk klik)
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll ke section
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
                
                // Update active state di navbar
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    }
                });
                
                // Scroll ke section
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
    
    // Tombol Close untuk semua popup
    document.querySelectorAll('.popup-close').forEach(btn => {
        btn.addEventListener('click', closePopup);
    });
}

// ============================================
// INISIALISASI SAAT PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ VisiDigital script loaded successfully!');
    
    // Setup semua fungsi
    setupContactForm();
    setupPackageForm();
    setupEventListeners();
    
    // Update active nav link awal
    updateActiveNavLink();
    
    // Listen scroll untuk update active link
    window.addEventListener('scroll', updateActiveNavLink);
});

function openPackagePopup(packageName, packagePrice) {
    // Set data paket
    document.getElementById("selectedPackage").value = packageName;
    document.getElementById("packagePrice").value = packagePrice;
    
    // Update info mini di form
    document.getElementById("miniPackageName").innerText = "Paket " + packageName;
    document.getElementById("miniPackagePrice").innerText = "Rp " + packagePrice + " /bulan";
    
    // Tampilkan popup
    const popup = document.getElementById("packagePopup");
    popup.classList.add("active");
    
    // Reset form
    document.getElementById("packageForm").reset();
    
    // Fokus ke input pertama
    setTimeout(() => {
        document.getElementById("packageFullName").focus();
    }, 300);
}