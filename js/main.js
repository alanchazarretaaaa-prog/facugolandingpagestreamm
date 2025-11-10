/**
 * FacuGo! Stream - Main JavaScript
 * Handles modal interactions, smooth scrolling, and navigation effects
 */

// ============================================
// FAQ FUNCTIONALITY
// ============================================

/**
 * Toggle FAQ items
 */
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ============================================
// MODAL FUNCTIONALITY
// ============================================

/**
 * Open modal when clicking on links with 'open-modal' class
 */
document.querySelectorAll('.open-modal').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const modalId = e.target.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

/**
 * Close modal when clicking the close button
 */
document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', e => {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
});

/**
 * Close modal when clicking outside the modal content
 */
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

/**
 * Close modal with ESC key
 */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// ============================================
// SMOOTH SCROLL
// ============================================

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for links that just use '#'
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// NAVIGATION EFFECTS
// ============================================

/**
 * Add shadow to navbar on scroll
 */
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled down
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ============================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================

/**
 * Animate elements when they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

/**
 * Lazy load images (if needed in the future)
 */
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// PAGE LOAD EFFECTS
// ============================================

/**
 * Initialize page on load
 */
window.addEventListener('load', () => {
    // Remove any loading overlays if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }

    // Trigger animations
    document.body.classList.add('loaded');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait = 10, immediate = true) {
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

// ============================================
// CONSOLE MESSAGE (Optional - can be removed)
// ============================================

// console.log('%cFacuGo! Stream', 'color: #6B4BFF; font-size: 24px; font-weight: bold;');
// console.log('%cOperado por SOFTMAGNO LLC', 'color: #B4B4C8; font-size: 12px;');
// console.log('%c¿Interesado en desarrollo? Escríbenos a developer@facugo.com', 'color: #6B4BFF; font-size: 12px;');