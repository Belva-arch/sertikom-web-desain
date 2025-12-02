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

// ============================================
// ANIMASI FADE-IN SAAT SCROLL (KECUALI PORTO)
// ============================================
function setupScrollAnimations() {
    // HANYA section yang perlu animasi (kecuali porto)
    const sections = document.querySelectorAll('.hero, .visidigital-section, .keunggulan-section, .pricing-section, .contact-section, .footer');
    const cards = document.querySelectorAll('.keunggulan-card, .pricing-card, .contact-card, .contact-info-card');
    
    function checkVisibility() {
        // Animasi untuk sections
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0);
            
            if (isVisible && !section.classList.contains('fade-in')) {
                section.classList.add('fade-in');
            }
        });
        
        // Animasi untuk cards
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0);
            
            if (isVisible && !card.classList.contains('card-fade-in')) {
                card.classList.add('card-fade-in');
            }
        });
    }
    
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    
    // Trigger awal
    setTimeout(checkVisibility, 100);
}

// ============================================
// POPUP KONFIRMASI (Cepat)
// ============================================
function showSuccessPopup(title, message) {
    let popup = document.getElementById('successPopup');
    
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'successPopup';
        popup.className = 'popup-overlay';
        popup.innerHTML = `
            <div class="popup-box success">
                <h3 class="popup-title mb-3">${title}</h3>
                <p class="popup-message">${message}</p>
                <button class="popup-close mt-3" onclick="closeSuccessPopup()">OK</button>
            </div>
        `;
        document.body.appendChild(popup);
    } else {
        popup.querySelector('.popup-title').textContent = title;
        popup.querySelector('.popup-message').textContent = message;
    }
    
    // Tampilkan segera
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
    
    // Auto close lebih cepat (3 detik)
    setTimeout(() => {
        closeSuccessPopup();
    }, 3000);
}

function closeSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('active');
        
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 200);
    }
}

// ============================================
// FORM HANDLER UNTUK PAKET (Lebih Cepat)
// ============================================
function setupPackageForm() {
    const packageForm = document.getElementById("packageForm");
    if (packageForm) {
        packageForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const packageName = document.getElementById("selectedPackage").value;
            const fullName = document.getElementById("packageFullName").value.trim();
            const email = document.getElementById("packageEmail").value.trim();
            
            // Validasi cepat
            if (!fullName || !email) {
                showSuccessPopup("⚠️ Perhatian", "Harap isi nama lengkap dan email.");
                return;
            }
            
            if (!validateEmail(email)) {
                showSuccessPopup("⚠️ Perhatian", "Format email tidak valid.");
                return;
            }
            
            // Efek loading singkat
            const submitBtn = this.querySelector('.btn-submit');
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            // Simulasi pengiriman cepat (1 detik)
            setTimeout(() => {
                // Reset tombol
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                
                // Tutup popup paket
                closePackagePopup();
                
                // Tampilkan popup konfirmasi
                setTimeout(() => {
                    showSuccessPopup(
                        "✅ Berhasil!",
                        `Paket ${packageName} berhasil dipesan!\n\n` +
                        `Tim kami akan menghubungi Anda di ${email} dalam 24 jam.`
                    );
                    
                    // Reset form
                    this.reset();
                }, 300);
            }, 1000);
        });
    }
}

// ============================================
// FORM HANDLER UNTUK KONTAK (Lebih Cepat)
// ============================================
function setupContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            // Validasi cepat
            if (!fullName || !email || !message) {
                showSuccessPopup("⚠️ Perhatian", "Harap isi semua field yang wajib.");
                return;
            }
            
            if (!validateEmail(email)) {
                showSuccessPopup("⚠️ Perhatian", "Format email tidak valid.");
                return;
            }
            
            // Loading singkat
            const submitBtn = this.querySelector('.contact-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            
            // Simulasi cepat (1 detik)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                showSuccessPopup(
                    "✅ Terkirim!",
                    `Terima kasih <strong>${fullName}</strong>!\n\n` +
                    `Pesan Anda telah dikirim.\n` +
                    `Kami akan membalas ke <strong>${email}</strong> dalam 1-2 hari.`
                );
                
                this.reset();
            }, 1000);
        });
    }
}

// ============================================
// FUNGSI BUKA/TUTUP POPUP PAKET (Cepat)
// ============================================
function openPackagePopup(packageName, packagePrice) {
    // Set data
    document.getElementById("selectedPackage").value = packageName;
    document.getElementById("packagePrice").value = packagePrice;
    
    // Update info
    document.getElementById("miniPackageName").innerText = "Paket " + packageName;
    document.getElementById("miniPackagePrice").innerText = "Rp " + packagePrice + " /bulan";
    
    // Reset dan tampilkan
    const popup = document.getElementById("packagePopup");
    popup.classList.add("active");
    
    // Reset form
    document.getElementById("packageForm").reset();
    
    // Fokus cepat
    setTimeout(() => {
        document.getElementById("packageFullName").focus();
    }, 200);
}

function closePackagePopup() {
    const popup = document.getElementById("packagePopup");
    popup.classList.remove("active");
}

// ============================================
// INISIALISASI CEPAT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ VisiDigital loaded!');
    
    // Setup animasi
    setupScrollAnimations();
    
    // Setup form
    setupContactForm();
    setupPackageForm();
    setupEventListeners();
    
    // Auto show hero
    setTimeout(() => {
        document.querySelector('.hero')?.classList.add('fade-in');
    }, 50);
});

// ============================================
// EVENT LISTENERS (SIMPLE)
// ============================================
function setupEventListeners() {
    // Tombol Pilih Paket
    document.querySelectorAll('.pricing-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.pricing-card');
            const packageName = card.querySelector('.pricing-header h3').innerText;
            const packagePrice = card.querySelector('.amount').innerText;
            
            openPackagePopup(packageName, packagePrice);
        });
    });
    
    // Close buttons
    document.querySelector('#packagePopup .btn-close')?.addEventListener('click', closePackagePopup);
    document.querySelector('#packagePopup .btn-cancel')?.addEventListener('click', closePackagePopup);
    
    // Close on overlay click
    document.querySelectorAll('.popup-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this && this.id === 'packagePopup') {
                closePackagePopup();
            }
        });
    });
    
    // Smooth scroll navbar
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Update active
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile navbar
                    const navbarCollapse = document.querySelector('.navbar-collapse.show');
                    if (navbarCollapse) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });
}