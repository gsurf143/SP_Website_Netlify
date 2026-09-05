// Side Menu Toggle
const sideMenuToggle = document.getElementById('side-menu-toggle');
const sideMenu = document.getElementById('side-menu');
const sideMenuClose = document.getElementById('side-menu-close');
const sideMenuOverlay = document.getElementById('side-menu-overlay');
const sideMenuLinks = document.querySelectorAll('.side-menu-link');

function openSideMenu() {
    sideMenu.classList.add('active');
    sideMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSideMenu() {
    sideMenu.classList.remove('active');
    sideMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

sideMenuToggle.addEventListener('click', openSideMenu);
sideMenuClose.addEventListener('click', closeSideMenu);
sideMenuOverlay.addEventListener('click', closeSideMenu);

// Close side menu when clicking on a link
sideMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(closeSideMenu, 300); // Small delay for smooth scroll
    });
});

// Close side menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
        closeSideMenu();
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

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

// Intersection Observer for fade-in animations
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
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-category, .project-card, .about-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroTitle.innerHTML = text.slice(0, index + 1);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };
    
    updateCounter();
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Form validation functions
function validatePhone(phone) {
    // UK phone format: +44 (0) XX XXXX XXXX or 0XXX XXX XXXX
    // International format: +XX XXX XXX XXXX
    const phoneRegex = /^(\+44\s?(\(0\))?\s?|0)[1-9]\d{1,4}\s?\d{1,4}\s?\d{1,4}\s?\d{1,4}$/;
    return phone === '' || phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateMessage(message) {
    return message.trim().length >= 10; // Minimum 10 characters
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
    input.classList.remove('valid');
}

function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error');
    input.classList.add('valid');
}

function clearValidation(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error', 'valid');
}

// Real-time validation
function setupRealTimeValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    // Name validation
    nameInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this, 'Name is required');
        } else if (this.value.trim().length < 2) {
            showError(this, 'Name must be at least 2 characters');
        } else {
            showSuccess(this);
        }
    });
    
    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearValidation(this);
        }
    });
    
    // Email validation
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() === '') {
            showError(this, 'Email is required');
        } else if (!emailRegex.test(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            showSuccess(this);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearValidation(this);
        }
    });
    
    // Phone validation
    phoneInput.addEventListener('blur', function() {
        if (this.value.trim() !== '' && !validatePhone(this.value)) {
            showError(this, 'Please enter a valid phone number (e.g., +44 123 456 7890)');
        } else if (this.value.trim() !== '') {
            showSuccess(this);
        } else {
            clearValidation(this); // Phone is optional
        }
    });
    
    phoneInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearValidation(this);
        }
    });
    
    // Message validation
    messageInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this, 'Message is required');
        } else if (!validateMessage(this.value)) {
            showError(this, 'Message must be at least 10 characters');
        } else {
            showSuccess(this);
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            clearValidation(this);
        }
        
        // Real-time character count
        const charCount = this.value.trim().length;
        const formGroup = this.closest('.form-group');
        let charCountElement = formGroup.querySelector('.char-count');
        
        if (!charCountElement) {
            charCountElement = document.createElement('div');
            charCountElement.className = 'char-count';
            formGroup.appendChild(charCountElement);
        }
        
        charCountElement.textContent = `${charCount}/10 characters`;
        charCountElement.style.color = charCount >= 10 ? '#10B981' : '#EF4444';
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Setup real-time validation
    setupRealTimeValidation();
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Custom validation
        let isValid = true;
        
        // Validate name
        const nameInput = document.getElementById('name');
        if (data.name.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else if (data.name.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(data.email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (optional but if provided must be valid)
        const phoneInput = document.getElementById('phone');
        if (data.phone.trim() !== '' && !validatePhone(data.phone)) {
            showError(phoneInput, 'Please enter a valid phone number (e.g., +44 123 456 7890)');
            isValid = false;
        }
        
        // Validate message
        const messageInput = document.getElementById('message');
        if (data.message.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else if (!validateMessage(data.message)) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If validation fails, show error and stop
        if (!isValid) {
            showNotification('Please fix the errors in the form', 'error');
            return;
        }
        
        // Encode form data for Netlify
        const formDataNetlify = new FormData();
        formDataNetlify.append('form-name', 'contact');
        formDataNetlify.append('name', data.name);
        formDataNetlify.append('email', data.email);
        formDataNetlify.append('phone', data.phone);
        formDataNetlify.append('message', data.message);
        
        // For local development, skip actual submission
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Local development mode - form data:', data);
            showNotification('Your enquiry has been submitted (local dev mode)', 'success');
            contactForm.reset();
            // Clear validation states
            document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
                clearValidation(input);
            });
            return;
        }
        
        // Submit to Netlify Forms (only in production)
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formDataNetlify).toString()
        })
        .then(() => {
            showNotification('Your enquiry has been submitted', 'success');
            contactForm.reset();
            // Clear validation states
            document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
                clearValidation(input);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            showNotification('There was an error sending your request. Please try again.', 'error');
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--secondary-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 800;
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill bar animation (if you want to add skill bars later)
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
};

// Initialize particles background (optional enhancement)
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
};

// Add floating animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px);
        }
        33% {
            transform: translateY(-30px) translateX(20px);
        }
        66% {
            transform: translateY(20px) translateX(-20px);
        }
        100% {
            transform: translateY(0px) translateX(0px);
        }
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// Initialize particles on load
window.addEventListener('load', () => {
    createParticles();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    sideMenuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active state style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .side-menu-link.active {
        color: #DC2626 !important;
        background: linear-gradient(90deg, rgba(220, 38, 38, 0.2), rgba(239, 68, 68, 0.1));
        border-left: 4px solid #DC2626;
    }
    
    .side-menu-link.active i {
        color: #DC2626 !important;
        transform: scale(1.2);
    }
`;
document.head.appendChild(activeStyle);

// Console welcome message
console.log('%c🏗️ Welcome to Nemesgeod Ltd!', 'color: #1F2937; font-size: 20px; font-weight: bold;');
console.log('%cBuilding Excellence Since 2016', 'color: #F59E0B; font-size: 14px;');
console.log('%cPrecision Surveying, Reliable Foundation', 'color: #10B981; font-size: 12px;');
