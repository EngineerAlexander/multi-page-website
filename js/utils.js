// utils.js

/**
 * Fetch JSON data from a given URL.
 * @param {string} url - The URL to fetch the data from.
 * @returns {Promise<Object>} - A promise that resolves to the JSON data.
 */
async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch JSON from ${url}:`, error);
        return null;
    }
}

/**
 * Dynamically create and append elements to a parent.
 * @param {string} tag - The HTML tag to create.
 * @param {Object} attributes - An object of attributes (e.g., id, class).
 * @param {string} textContent - Optional text content for the element.
 * @param {Element} parent - The parent element to append to.
 * @returns {Element} - The created element.
 */
function createElement(tag, attributes = {}, textContent = '', parent = null) {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    if (textContent) {
        element.textContent = textContent;
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}

// Typing effect with one word at a time and cursor, with duration proportional to word length
export function typeEffectWithCursor(element, text, baseDelay = 0, lengthDelayMultiplier = 10) {
    const words = text.split(' '); // Split the text into words
    let index = 0;

    // Ensure the element is set up for left-aligned text
    element.style.textAlign = 'left';
    element.style.whiteSpace = 'pre-wrap'; // Preserve spaces for correct alignment

    // Create the blinking cursor
    const cursor = document.createElement('span');
    cursor.textContent = '|'; // Add the cursor
    cursor.style.display = 'inline-block';
    element.appendChild(cursor);

    function typeWord() {
        if (index < words.length) {
            // Add the next word and a space
            const currentText = element.textContent.replace('|', ''); // Remove the cursor from text
            element.textContent = currentText + words[index] + ' ';
            element.appendChild(cursor); // Ensure cursor stays at the end
            const wordLength = words[index].length;
            index++;
            // Adjust typing delay proportional to word length
            setTimeout(typeWord, baseDelay + wordLength * lengthDelayMultiplier); // Adjust multiplier as needed
        } else {
            cursor.remove(); // Remove the cursor after all words are typed
        }
    }

    typeWord();
}

// Export functions for reuse in other files (for future modularity, e.g., bundling with a tool like Webpack or Rollup)
export { fetchJSON, createElement };