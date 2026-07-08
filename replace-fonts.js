const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Replace Google Fonts Links
const googleFontsRegex = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter.*?rel="stylesheet">/s;
const newFontsLinks = `<link href="https://fonts.cdnfonts.com/css/canela" rel="stylesheet">
  <link href="https://fonts.cdnfonts.com/css/gotham" rel="stylesheet">`;
html = html.replace(googleFontsRegex, newFontsLinks);

// 2. Replace CSS Variables
html = html.replace(/--font-serif: 'Playfair Display', serif;/g, "--font-serif: 'canela', serif;");
html = html.replace(/--font-sans: 'Inter', sans-serif;/g, "--font-sans: 'Gotham Light', 'Gotham', sans-serif;");

// 3. Fix any mistaken var(--sans) usage
html = html.replace(/var\(--sans\)/g, "var(--font-sans)");

fs.writeFileSync(indexPath, html);
console.log('Fonts replaced successfully with Canela and Gotham Light.');
