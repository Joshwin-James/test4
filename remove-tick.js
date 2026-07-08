const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Remove the SVG tick icon
html = html.replace(/<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e"[\s\S]*?<\/svg>/, '');

// The SVG might have been inside a div wrapper (e.g., <div class="something"> <svg>... </svg> </div>)
// Let's also remove any empty div that might be left behind right before the text we deleted.
// Actually, just removing the SVG is enough to make the tick disappear from the screen.
// We can also remove the container if it's .hero-trust
html = html.replace(/<div class="hero-trust"[^>]*>\s*<\/div>/g, '');
html = html.replace(/<div class="hero-trust"[^>]*>\s*<div[^>]*>\s*<\/div>\s*<\/div>/g, '');

fs.writeFileSync(indexPath, html);
console.log('Removed the green tick SVG icon.');
