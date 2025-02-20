// main.js
/* ==========================================================================
   Generic
   ========================================================================== */

// Highlight the active page in the navbar
document.querySelectorAll('.navbar a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1); // Remove the '#'
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

/* ==========================================================================
   Homepage
   ========================================================================== */
import { typeEffectWithCursor } from './typing-effect.js';

const introParagraph = document.getElementById('intro-paragraph');

async function loadIntroText() {
    try {
        const response = await fetch('data/intro-text.json');
        const data = await response.json();
        const introText = data.introText;

        // Call the typing effect with the loaded text
        typeEffectWithCursor(introParagraph, introText);
    } catch (error) {
        console.error("Failed to load intro text:", error);
    }
}

// Initialize typing effect after loading the text
window.onload = loadIntroText;

/* ==========================================================================
   Resume
   ========================================================================== */

// Animate skill bars on page load
document.addEventListener("DOMContentLoaded", () => {
    const skillFills = document.querySelectorAll(".skill-fill");
    skillFills.forEach(skill => {
        const skillLevel = skill.style.getPropertyValue("--skill-level");
        skill.style.width = skillLevel; // Set the width dynamically for animation
    });
});

// Function to handle intersection and trigger the slide-in animation
function observePanels() {
    const panels = document.querySelectorAll('.job, .education-item, .project'); // Include elements to be animated
    const observerOptions = {
        root: null,
        threshold: 0.1, // Visibility threshold for animation
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add visible class when in view
                observer.unobserve(entry.target); // Stop observing once it's animated
            }
        });
    }, observerOptions);

    panels.forEach(panel => observer.observe(panel));
}

// Run the observer function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    observePanels();
});

/* ==========================================================================
   About
   ========================================================================== */

// Function to animate items as they enter the viewport
function observeAboutItems() {
    const aboutItems = document.querySelectorAll('.about-item');
    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add visible class
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    aboutItems.forEach(item => observer.observe(item));
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', observeAboutItems);

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank'); // Open the link in a new tab
            }
        });
    });
});

/* ==========================================================================
   Header & Navigation
   ========================================================================== */

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    if (hamburger && navbar) {
        // Toggle menu when hamburger is clicked
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('show');
            hamburgerIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
            body.style.overflow = navbar.classList.contains('show') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('show');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbar.classList.contains('show') && 
                !navbar.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navbar.classList.remove('show');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                body.style.overflow = '';
            }
        });
    }
});

/* ==========================================================================
   Footer
   ========================================================================== */

// Update the footer year dynamically
const dynamicYear = document.getElementById('dynamic-year');
if (dynamicYear) {
    dynamicYear.textContent = new Date().getFullYear();
}