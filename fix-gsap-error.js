const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Remove the broken GSAP animation for the deleted scrollInd element
html = html.replace(/tl\.fromTo\("#scrollInd"[\s\S]*?\);/g, '');

fs.writeFileSync(indexPath, html);
console.log('Fixed GSAP error caused by scrollInd.');
