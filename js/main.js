/**
 * TimeTravel Agency - Main JavaScript
 * Handles navigation, animations, and form interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavigation();
    initScrollAnimations();
    initDestinationCards();
    initReservationForm();
});

/**
 * Cursor Glow Effect
 * Creates a subtle glow that follows the cursor
 */
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const ease = 0.1;
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;

        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

/**
 * Navigation Effects
 * Handles sticky nav and scroll progress
 */
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add background on scroll
        if (currentScroll > 100) {
            nav.style.background = 'rgba(8, 9, 12, 0.98)';
        } else {
            nav.style.background = 'linear-gradient(to bottom, rgba(8, 9, 12, 0.95), transparent)';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for nav links
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
}

/**
 * Scroll-triggered Animations
 * Uses Intersection Observer for reveal effects
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.about-card, .destination-card, .section-label, .section-title, .reservation-form'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Destination Cards Interactions
 */
function initDestinationCards() {
    const cards = document.querySelectorAll('.destination-card');

    cards.forEach(card => {
        // Parallax effect on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Button click - open chatbot with destination
        const btn = card.querySelector('.card-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const destination = btn.dataset.destination;
                openChatbotWithQuestion(`Je souhaite en savoir plus sur ${destination}`);
            });
        }
    });
}

/**
 * Reservation Form Handling
 */
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
            </svg>
            <span>Envoi en cours...</span>
        `;
        submitBtn.disabled = true;

        // Add spinner animation
        const spinnerStyle = document.createElement('style');
        spinnerStyle.textContent = `
            .spinner {
                width: 20px;
                height: 20px;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinnerStyle);

        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Demande envoyée !</span>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #1e8449)';

            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        }, 1500);

        console.log('Reservation data:', data);
    });

    // Input animations
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Helper function to open chatbot with a specific question
 */
function openChatbotWithQuestion(question) {
    const chatbot = document.getElementById('chatbot');
    const input = document.getElementById('chatbotInput');

    if (chatbot && input) {
        chatbot.classList.add('active');
        chatbot.classList.add('opened');
        input.value = question;
        input.focus();

        // Trigger the form submission
        setTimeout(() => {
            document.getElementById('chatbotForm').dispatchEvent(new Event('submit'));
        }, 300);
    }
}

/**
 * Video Fallback
 * Handles cases where video doesn't load
 */
document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.addEventListener('error', () => {
            // Create a gradient fallback
            const container = document.querySelector('.hero-video-container');
            if (container) {
                container.innerHTML = `
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #0d0f14 0%, #1a1d26 50%, #0d0f14 100%);
                    "></div>
                `;
            }
        });
    }
});
