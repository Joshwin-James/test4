const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Ensure ScrollTrigger is registered before ANY GSAP timeline is created
html = html.replace(/document\.addEventListener\('DOMContentLoaded', \(\) => {/g, "document.addEventListener('DOMContentLoaded', () => {\n  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);");

fs.writeFileSync(indexPath, html);
console.log('Fixed ScrollTrigger registration timing.');
