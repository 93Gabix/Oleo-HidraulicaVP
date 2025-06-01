// Initialize Lucide icons
lucide.createIcons();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// WhatsApp function
function openWhatsApp() {
    const message = "👷🏼 ¡Hola! Gracias por contactarnos. 👷🏼";
    const phoneNumber = "5491234567890"; // Reemplaza con tu número de WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Contact form submission
function sendEmail(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Construct email body
    const emailBody = `
        Nombre: ${name}
        Email: ${email}
        Teléfono: ${phone}
        
        Mensaje: ${message}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:gabrielmelano19@gmail.com?subject=Consulta desde la web&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    form.reset();
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.team-card, .product-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    if (!nav) return;
    
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    menuToggle.style.display = 'none';
    
    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block !important;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-orange);
                cursor: pointer;
            }
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .nav-menu.active {
                display: flex !important;
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
        }
    `;
    document.head.appendChild(style);
    
    nav.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', () => {
        const menu = document.querySelector('.nav-menu');
        if (menu) {
            menu.classList.toggle('active');
        }
    });
    
    lucide.createIcons();
};

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (isNaN(target)) return;
        
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter.parentElement);
    });
};

// Smooth reveal animations
const revealElements = document.querySelectorAll('.section-title, .about-text, .cta-button');
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// PDF download function - DEFINIDA ANTES DE SER USADA
function downloadPDF(category, categoryName) {
    // PDF URLs for each category
    const pdfUrls = {
        'acumuladores': './pdfs/Acumuladores.pdf',
        'bombas': './pdfs/Bombas.pdf',
        'cilindroshidráulicos': './pdfs/CilindrosHidráulicos.pdf',
        'electrovalvulas': './pdfs/ElectroválvulasVálvulasModularesMontaje.pdf',
        'elemtransmision': './pdfs/Elementos de transmisión-AcoplamientoselásticosParamotoreléctrico.pdf',
    };

    const pdfUrl = pdfUrls[category];
    
    if (pdfUrl) {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `catalogo-${category}-oleohidraulica-vp.pdf`;
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        console.log(`Descargando catálogo de ${categoryName}...`);
        // Opcional: Mostrar notificación más elegante en lugar de alert
        // alert(`Descargando catálogo de ${categoryName}...`);
    } else {
        // If PDF doesn't exist, show message
        alert(`El catálogo de ${categoryName} estará disponible próximamente. Por favor, contáctanos para más información.`);
    }
}

// Product filtering - FUNCIÓN PRINCIPAL CORREGIDA
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const noFilterMessage = document.querySelector('.no-filter-message');
    const pdfSection = document.getElementById('pdfDownloadSection');
    const pdfBtn = document.getElementById('pdfDownloadBtn');
    if (!filterButtons || !productCards || !noFilterMessage || !pdfSection || !pdfBtn) {
        console.error('One or more elements not found.');
        return;
    }

    console.log('Filter buttons found:', filterButtons.length);
    console.log('Product cards found:', productCards.length);

    // Category names in Spanish
    const categoryNames = {
        'all': 'Todos los Productos',
        'acumuladores': 'Acumuladores',
        'bombas': 'Bombas',
        'direcciones': 'Direcciones Orbitales',
        'valvulas': 'Válvulas de Comando',
        'electrovalvulas': 'Electroválvulas',
        'mangueras': 'Mangueras Hidráulicas',
        'todo': 'Catálogo Oleohidráulica VP'
    };

    // Initialize mobile menu
    createMobileMenu();
    
    // Initialize counter animation
    animateCounters();

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get filter value BEFORE removing active classes
            const filter = this.getAttribute('data-filter');
            console.log('Filter selected:', filter);
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Hide the no-filter message
            if (noFilterMessage) {
                noFilterMessage.style.display = 'none';
            }
            
            // Show/hide products based on filter
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    if (cardCategory === filter) {
                        card.style.display = 'block';
                        card.classList.remove('hidden');
                    } else {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                    }
                }
            });

            // Show PDF download section only if elements exist
            if (pdfSection && pdfBtn) {
                if (filter === 'all') {
                    // OCULTAR la sección PDF cuando se selecciona "Todos"
                    pdfSection.style.display = 'none';
                } else {
                    // MOSTRAR la sección PDF solo para categorías específicas
                    pdfSection.style.display = 'block';
                    
                    // Update PDF button text and functionality
                    const categoryName = categoryNames[filter] || filter;
                    
                    pdfBtn.innerHTML = `<i data-lucide="download"></i> Ver más información de ${categoryName} (PDF)`;
                    
                    // Remove any existing click handlers and add new one
                    pdfBtn.onclick = function() {
                        downloadPDF(filter, categoryName);
                    };
                }

                // Recreate icons after updating innerHTML
                lucide.createIcons();
            }
        });
    });
});
});
