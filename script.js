// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initMobileMenu();
    initSmoothScroll();
    initTestimonialSlider();
    initContactForm();
});

// ========================================
// AOS ANIMATION
// ========================================

function initAOS() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    // Open mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Change hamburger icon to X
            hamburger.innerHTML = '<i class="fa-solid fa-times"></i>';
        });
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Change X back to hamburger
        if (hamburger) {
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking on a link (except external links)
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.hasAttribute('target')) {
                closeMobileMenu();
            }
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// TESTIMONIAL SLIDER (SWIPER)
// ========================================

function initTestimonialSlider() {
    const swiper = new Swiper('.depoimentos-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        speed: 800,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}

// ========================================
// CONTACT FORM VALIDATION
// ========================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const nome = document.getElementById('nome');
        const telefone = document.getElementById('telefone');
        const mensagem = document.getElementById('mensagem');
        
        let isValid = true;
        
        // Validate nome
        if (nome.value.trim() === '') {
            showError(nome, 'nomeError', 'Campo obrigatório');
            isValid = false;
        }
        
        // Validate telefone
        if (telefone.value.trim() === '') {
            showError(telefone, 'telefoneError', 'Campo obrigatório');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            showSuccessModal();
            form.reset();
        }
    });
    
    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

function showError(inputElement, errorElementId, message) {
    inputElement.classList.add('error');
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
    
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// CARD HOVER ENHANCEMENTS
// ========================================

const diferencialCards = document.querySelectorAll('.diferencial-card');

diferencialCards.forEach(card => {
    const icon = card.querySelector('.card-icon');
    
    card.addEventListener('mouseenter', function() {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

const especialidadeCards = document.querySelectorAll('.especialidade-card');

especialidadeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});

// ========================================
// WHATSAPP CLICK TRACKING
// ========================================

const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

whatsappButtons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // Add your analytics tracking here
        // Example: gtag('event', 'click', { 'event_category': 'WhatsApp', 'event_label': 'Contact' });
    });
});

// ========================================
// LOADING ANIMATION
// ========================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
        }, 300);
    }
});

// ========================================
// PREVENT SCROLL WHEN MOBILE MENU IS OPEN
// ========================================

const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenu) {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    observer.observe(mobileMenu, {
        attributes: true
    });
}

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation for mobile menu
document.addEventListener('keydown', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    }
});

// Focus management for mobile menu
const hamburger = document.getElementById('hamburger');
const closeMenu = document.getElementById('closeMenu');

if (hamburger && closeMenu) {
    hamburger.addEventListener('click', function() {
        setTimeout(() => {
            closeMenu.focus();
        }, 300);
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// ANALYTICS TRACKING (Placeholder)
// ========================================

// Track CTA button clicks
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href');
        
        console.log(`CTA Clicked: ${buttonText} | Destination: ${buttonHref}`);
        
        // Add your analytics tracking code here
        // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
    });
});

// Track form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function() {
        console.log('Contact form submitted');
        // Add your analytics tracking code here
    });
}

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================

console.log('%cDr. [Nome] - Odontologia de Alta Performance', 'color: #0A2F44; font-size: 20px; font-weight: bold;');
console.log('%cPrecisão que devolve sorrisos 😊', 'color: #C5A059; font-size: 14px;');
console.log('%cAgende sua consulta via WhatsApp!', 'color: #1E1E1E; font-size: 12px;');

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

// Animate elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    animateOnScroll.observe(section);
});

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');

if (footerText) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

// ========================================
// SMOOTH TRANSITIONS FOR CARDS
// ========================================

// Add transition delays for grid items
const gridCards = document.querySelectorAll('.diferencial-card, .especialidade-card');

gridCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});
