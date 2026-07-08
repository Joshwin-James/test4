const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Replace Canela CDN link with Marcellus Google Font link
html = html.replace(
  /<link href="https:\/\/fonts\.cdnfonts\.com\/css\/canela" rel="stylesheet">/g,
  '<link href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap" rel="stylesheet">'
);

// Replace Canela font-family with Marcellus
html = html.replace(/--font-serif: 'canela', serif;/g, "--font-serif: 'Marcellus', serif;");

fs.writeFileSync(indexPath, html);
console.log('Swapped Canela for Marcellus.');
