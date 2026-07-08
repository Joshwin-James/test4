const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Update active item CSS
const oldItemActive = /\.vwf-item\.active \{ background: #ffffff; border-color: #ffffff; box-shadow: 0 24px 48px rgba\(0,0,0,0\.3\); \}/;
const newItemActive = '.vwf-item.active { background: #ffffff; border-color: #ffffff; box-shadow: 0 30px 60px rgba(0,0,0,0.6); transform: scale(1.05); z-index: 10; }';
html = html.replace(oldItemActive, newItemActive);

// Update icon pop out
const oldIconActive = /\.vwf-item\.active \.vwf-icon-box \{ background: var\(--dark\); color: #fff; border-color: var\(--dark\); transform: \nscale\(1\.05\); box-shadow: 0 12px 24px rgba\(0,0,0,0\.1\); \}/g;
// Since line breaks might be weird, use regex for safety
html = html.replace(/\.vwf-item\.active \.vwf-icon-box \{[^}]+\}/g, '.vwf-item.active .vwf-icon-box { background: var(--dark); color: #fff; border-color: var(--dark); transform: scale(1.2) rotate(8deg); box-shadow: 0 20px 40px rgba(0,0,0,0.3); z-index: 20; }');

// Make sure un-active item has z-index to avoid stacking issues during transition
html = html.replace(/\.vwf-item \{ position: relative;/, '.vwf-item { position: relative; z-index: 3; transform: scale(1);');

fs.writeFileSync(indexPath, html);
console.log('Pop out animation added to active workflow cards.');
