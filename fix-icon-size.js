const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Reduce the font-size of the icons inside the button
html = html.replace(/font-size: 24px !important;/g, 'font-size: 16px !important;');

fs.writeFileSync(indexPath, html);
console.log('Icon font size reduced.');
