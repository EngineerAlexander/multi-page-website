// main.js

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

// Dark/Light Theme Toggle
const themeToggleButton = document.getElementById('theme-toggle');
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        // Save theme preference to localStorage
        const isLightTheme = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

import { typeEffectWithCursor } from './utils.js';

const introParagraph = document.getElementById('intro-paragraph');

async function loadIntroText() {
    try {
        const response = await fetch('data/intro-text.json'); // Adjust path if necessary
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
    const panels = document.querySelectorAll('.job, .education-item, .project'); // Include .project elements
    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when 10% of the element is visible
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

// Update the footer year dynamically
const dynamicYear = document.getElementById('dynamic-year');
if (dynamicYear) {
    dynamicYear.textContent = new Date().getFullYear();
}