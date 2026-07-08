const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Increase margin-bottom of header to prevent overlap with cards
html = html.replace(/\.vwf-header \{ text-align: center; margin-bottom: 40px; \}/, '.vwf-header { text-align: center; margin-bottom: 100px; }');

// Also increase padding-top of the timeline slightly just in case
html = html.replace(/\.vwf-timeline \{ position: relative; padding: 20px 0; \}/, '.vwf-timeline { position: relative; padding: 40px 0; }');

fs.writeFileSync(indexPath, html);
console.log('Fixed overlap issue between header and cards.');
