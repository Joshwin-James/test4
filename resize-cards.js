const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. INCREASE CARD WIDTH AND HEIGHT
// Update inline style in HTML
html = html.replace(
  /max-width: 700px; height: 260px;/g,
  'max-width: 860px; height: 300px;'
);
// Update any other variations if they exist
html = html.replace(
  /max-width: 750px; height: 280px;/g,
  'max-width: 860px; height: 300px;'
);

// 2. DECREASE BUTTON SIZE BY 20%
// 64px - 20% = ~51px, let's use 50px
html = html.replace(
  /width: 64px !important;\s*height: 64px !important;/g,
  'width: 50px !important; \n  height: 50px !important;'
);

// We should also decrease the padding inside the card just a tiny bit on the top/bottom if it's overflowing,
// but height 300px (from 260px) + width 860px (from 700px) will provide massive extra space so the text will spread horizontally and take fewer vertical lines.
// So the name won't overflow anymore.

fs.writeFileSync(indexPath, html);
console.log('Fixed card overflow dimensions and button sizes.');
