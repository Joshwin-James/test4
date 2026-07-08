const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Decrease particle density from 65 to 55 (approx 15% reduction)
html = html.replace(/for\(let i = 0; i < 65; i\+\+\) \{/g, 'for(let i = 0; i < 55; i++) {');

fs.writeFileSync(indexPath, html);
console.log('Decreased particle density.');
