document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            navCta.style.display = isVisible ? 'none' : 'flex';

            if (!isVisible) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close menu on mobile after click
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    navCta.style.display = 'none';
                }
            }
        });
    });

    // WhatsApp Form Submission
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('b_name').value;
            const phone = document.getElementById('b_phone').value;
            const pickup = document.getElementById('b_pickup').value;
            const drop = document.getElementById('b_drop').value;
            const car = document.getElementById('b_car').value;

            // Format WhatsApp Message
            const message = `*New Booking Request!*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Pickup Date:* ${pickup}%0A*Drop Date:* ${drop}%0A*Car Category:* ${car}`;

            // Your WhatsApp Number
            const toNumber = "917030665737";

            // Open WhatsApp link
            window.open(`https://wa.me/${toNumber}?text=${message}`, '_blank');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Today's date as min for date inputs
    const today = new Date().toISOString().split('T')[0];
    const pickupDate = document.getElementById('b_pickup');
    const dropDate = document.getElementById('b_drop');

    if (pickupDate) pickupDate.setAttribute('min', today);
    if (dropDate) dropDate.setAttribute('min', today);

    if (pickupDate && dropDate) {
        pickupDate.addEventListener('change', function () {
            dropDate.setAttribute('min', this.value);
            if (dropDate.value && dropDate.value < this.value) {
                dropDate.value = this.value;
            }
        });
    }
});
