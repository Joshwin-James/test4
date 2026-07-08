const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Replace Marcellus with Avegas Royale CDN link
html = html.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Marcellus&display=swap" rel="stylesheet">/g,
  '<link href="https://fonts.cdnfonts.com/css/avegas-royale" rel="stylesheet">'
);

// Update font family variable
html = html.replace(/--font-serif: 'Marcellus', serif;/g, "--font-serif: 'Avegas Royale', serif;");

fs.writeFileSync(indexPath, html);
console.log('Swapped Marcellus for Avegas Royale.');
