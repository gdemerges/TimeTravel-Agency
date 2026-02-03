/**
 * TimeTravel Agency - Main JavaScript
 * Handles navigation, animations, and form interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initDestinationCards();
    initReservationForm();
});

/**
 * Cursor Glow Effect
 * Creates a subtle glow that follows the cursor
 * Optimized with requestAnimationFrame and reduced motion support
 */
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let rafId = null;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const ease = 0.1;
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;

        // Only update if movement is significant (performance optimization)
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            currentX += dx * ease;
            currentY += dy * ease;

            cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        }

        rafId = requestAnimationFrame(animateCursor);
    }

    rafId = requestAnimationFrame(animateCursor);

    // Cleanup function for potential future use
    return () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
    };
}

/**
 * Navigation Effects
 * Handles sticky nav and scroll progress
 */
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const navCta = document.querySelector('.nav-cta');
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

    // Nav CTA button - scroll to reservation
    if (navCta) {
        navCta.addEventListener('click', () => {
            const reservationSection = document.getElementById('reservation');
            if (reservationSection) {
                reservationSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

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
 * Mobile Menu
 * Handles burger menu toggle for mobile navigation
 */
function initMobileMenu() {
    const burger = document.getElementById('navBurger');
    const navLinks = document.getElementById('navLinks');

    if (!burger || !navLinks) return;

    // Toggle menu
    burger.addEventListener('click', () => {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');

        // Trap focus in menu when open
        if (!isExpanded) {
            const firstLink = navLinks.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            burger.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            burger.focus();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            burger.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        }
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
 * Reservation Form Handling with Real-time Validation
 */
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    let isSubmitting = false;

    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
            messages: {
                required: 'Le nom est requis',
                minLength: 'Le nom doit contenir au moins 2 caractères',
                maxLength: 'Le nom ne peut pas dépasser 100 caractères',
                pattern: 'Le nom ne peut contenir que des lettres, espaces et tirets'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            messages: {
                required: 'L\'email est requis',
                pattern: 'Veuillez entrer une adresse email valide'
            }
        },
        destination: {
            required: true,
            messages: {
                required: 'Veuillez choisir une destination'
            }
        },
        travelers: {
            required: true,
            messages: {
                required: 'Veuillez sélectionner le nombre de voyageurs'
            }
        },
        duration: {
            required: true,
            messages: {
                required: 'Veuillez sélectionner une durée de séjour'
            }
        }
    };

    /**
     * Validate a single field
     */
    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rules = validationRules[fieldName];
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');

        if (!rules) return true;

        // Clear previous states
        formGroup.classList.remove('error', 'success');
        errorElement.textContent = '';

        // Required validation
        if (rules.required && !fieldValue) {
            formGroup.classList.add('error');
            errorElement.textContent = rules.messages.required;
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!fieldValue && !rules.required) {
            return true;
        }

        // MinLength validation
        if (rules.minLength && fieldValue.length < rules.minLength) {
            formGroup.classList.add('error');
            errorElement.textContent = rules.messages.minLength;
            return false;
        }

        // MaxLength validation
        if (rules.maxLength && fieldValue.length > rules.maxLength) {
            formGroup.classList.add('error');
            errorElement.textContent = rules.messages.maxLength;
            return false;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(fieldValue)) {
            formGroup.classList.add('error');
            errorElement.textContent = rules.messages.pattern;
            return false;
        }

        // Field is valid
        formGroup.classList.add('success');
        return true;
    }

    /**
     * Validate all form fields
     */
    function validateForm() {
        let isValid = true;
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Real-time validation on blur
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
            input.parentElement.classList.remove('focused');
        });

        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        // Clear error on input
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Prevent multiple submissions
        if (isSubmitting) return;

        // Validate form
        if (!validateForm()) {
            // Focus first error field
            const firstError = form.querySelector('.form-group.error input, .form-group.error select');
            if (firstError) {
                firstError.focus();
            }
            return;
        }

        isSubmitting = true;
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

        // Add spinner animation if not already present
        if (!document.querySelector('#spinner-style')) {
            const spinnerStyle = document.createElement('style');
            spinnerStyle.id = 'spinner-style';
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
        }

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
                isSubmitting = false;
                form.reset();

                // Clear all validation states
                const formGroups = form.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.classList.remove('error', 'success');
                });
            }, 3000);
        }, 1500);

        console.log('Reservation data:', data);
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
