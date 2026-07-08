const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldHoverRegex = /\.svc-card:hover\s*\{[\s\S]*?\}/;
const newHover = `.svc-card:hover { border-color: rgba(15, 23, 42, 0.3); box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12); transform: translateY(-8px); z-index: 10; }`;

if (html.match(oldHoverRegex)) {
  html = html.replace(oldHoverRegex, newHover);
  console.log("Updated svc-card hover effect.");
} else {
  console.log("Could not find svc-card hover effect.");
}

fs.writeFileSync(indexPath, html);
