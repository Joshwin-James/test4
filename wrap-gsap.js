const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// The code that is failing is the raw GSAP code floating in global scope.
// Let's wrap all these sections in a DOMContentLoaded event.

// 1. Workflow
html = html.replace(/const vwfItems = gsap\.utils\.toArray\('\.vwf-item'\);/g, "document.addEventListener('DOMContentLoaded', () => {\n  const vwfItems = gsap.utils.toArray('.vwf-item');");
html = html.replace(/\/\/ ── BACK TO TOP/g, "});\n\n// ── BACK TO TOP");

// 2. Why Choose Us, Industries Stacked Cards, Particle Canvas
html = html.replace(/\/\/ --- WHY CHOOSE US EXCELLENCE COUNTERS ---/g, "document.addEventListener('DOMContentLoaded', () => {\n        // --- WHY CHOOSE US EXCELLENCE COUNTERS ---");
html = html.replace(/\/\/ MP ASSISTANT CHATBOT/g, "});\n\n// MP ASSISTANT CHATBOT");

fs.writeFileSync(indexPath, html);
console.log('Wrapped GSAP blocks in DOMContentLoaded to fix timing issues.');
