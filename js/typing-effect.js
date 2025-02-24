// utils.js

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