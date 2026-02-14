// Inicialização do AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ===== MENU MOBILE =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const menuIcon = document.getElementById('menuIcon');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Troca o ícone entre 'bars' e 'times'
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
}

// Fecha o menu mobile ao clicar em um link (para melhor UX)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1023) {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});

// ===== CARROSSEL DE DEPOIMENTOS =====
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
const totalSlides = slides.length;

// Cria os dots (bolinhas)
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

// Inicializa o carrossel se existir
if (track && slides.length > 0) {
    createDots();
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto-play a cada 5 segundos
    let autoPlay = setInterval(nextSlide, 5000);
    
    // Pausa o auto-play quando o mouse está sobre o carrossel
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 5000);
        });
    }
}

// ===== VALIDAÇÃO DE FORMULÁRIO =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome');
        const telefone = document.getElementById('telefone');
        const errorNome = document.getElementById('errorNome');
        const errorTelefone = document.getElementById('errorTelefone');
        
        let isValid = true;
        
        // Validação do Nome
        if (nome.value.trim() === '') {
            nome.classList.add('error');
            errorNome.textContent = 'Campo obrigatório';
            isValid = false;
        } else {
            nome.classList.remove('error');
            errorNome.textContent = '';
        }
        
        // Validação do Telefone (simples - apenas verifica se não está vazio)
        if (telefone.value.trim() === '') {
            telefone.classList.add('error');
            errorTelefone.textContent = 'Campo obrigatório';
            isValid = false;
        } else {
            telefone.classList.remove('error');
            errorTelefone.textContent = '';
        }
        
        if (isValid) {
            // Simulação de envio bem-sucedido
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            contactForm.reset();
        }
    });
}

// ===== SCROLL SUAVE (Smooth Scroll) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Verifica se o href não é apenas "#" e se o elemento alvo existe
        if (href !== '#' && href !== '') {
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Ajusta o scroll para compensar o header fixo
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});