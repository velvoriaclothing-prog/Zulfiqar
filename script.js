document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');

    if (hamburger && mobileMenu && closeBtn) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // Popup Logic
    const popupOverlay = document.getElementById('enquiryPopup');
    const popupCloseBtn = document.querySelector('.popup-close');
    const verticalEnquiryBtn = document.querySelector('.vertical-enquiry');
    const openPopupBtns = document.querySelectorAll('.open-popup-btn');

    const openPopup = (isAuto = false) => {
        if (isAuto === true && localStorage.getItem('enquiryFilled') === 'true') return;
        if(popupOverlay) popupOverlay.classList.add('active');
    };

    const closePopup = () => {
        if(popupOverlay) popupOverlay.classList.remove('active');
        if (localStorage.getItem('enquiryFilled') !== 'true') {
            clearTimeout(window.autoPopupTimer);
            window.autoPopupTimer = setTimeout(() => openPopup(true), 90000);
        }
    };

    // Auto open popup after 3 seconds on Home Page
    if (document.body.classList.contains('home-page')) {
        if (localStorage.getItem('enquiryFilled') !== 'true') {
            window.autoPopupTimer = setTimeout(() => {
                openPopup(true);
            }, 3000);
        }
    }

    if (verticalEnquiryBtn) {
        verticalEnquiryBtn.addEventListener('click', (e) => { e.preventDefault(); openPopup(false); });
    }

    openPopupBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Pre-fill product if data attribute exists
            const productSelect = document.getElementById('productSelect');
            const product = btn.getAttribute('data-product');
            if (product && productSelect) {
                productSelect.value = product;
            }
            openPopup(false);
        });
    });

    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', closePopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
    }

    // WhatsApp Form Submission
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const product = document.getElementById('productSelect').value;
            const message = document.getElementById('message').value;

            const waMessage = `*New Enquiry from Website*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Product Interest:* ${product}%0A*Message:* ${message}`;
            
            const waNumber = '918982638110';
            const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;
            
            localStorage.setItem('enquiryFilled', 'true');
            clearTimeout(window.autoPopupTimer);
            
            window.open(waLink, '_blank');
            closePopup();
            enquiryForm.reset();
        });
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 5%';
            navbar.style.backgroundColor = 'rgba(8, 9, 10, 0.98)';
        } else {
            navbar.style.padding = '1rem 5%';
            navbar.style.backgroundColor = 'rgba(8, 9, 10, 0.95)';
        }
    });
});
