/* ==========================================================================
   FABRICE SCHMIDT - LANDING PAGE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // --------------------------------------------------------------------------
    // Mobile Menu Toggle
    // --------------------------------------------------------------------------
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Toggle hamburger animation
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // --------------------------------------------------------------------------
    // Smooth Scroll for anchor links
    // --------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --------------------------------------------------------------------------
    // Reveal on Scroll (Intersection Observer)
    // --------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.service-card, .parallele-card, .zielgruppe-card, .phase, .casestudy-block');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        revealElements.forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // --------------------------------------------------------------------------
    // Navbar background on scroll
    // --------------------------------------------------------------------------
    const nav = document.querySelector('.nav');

    function updateNavOnScroll() {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavOnScroll);
    updateNavOnScroll(); // Initial check

    // --------------------------------------------------------------------------
    // Active nav link highlighting
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // --------------------------------------------------------------------------
    // Year in footer (always current)
    // --------------------------------------------------------------------------
    const yearElement = document.querySelector('.footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Fabrice Schmidt`;
    }

});

/* ==========================================================================
   Optional: Add loading animation
   ========================================================================== */
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
