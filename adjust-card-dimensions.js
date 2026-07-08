const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Make the cards longer horizontally (max-width from 850px to 1050px)
html = html.replace(
  /\.ind-cards-stack-container \{\s*position: relative;\s*width: 100%;\s*max-width: 850px;/m,
  '.ind-cards-stack-container { \n  position: relative; \n  width: 100%;\n  max-width: 1050px;'
);

// 2. Reduce the vertical height by approx 20%
// Reduce text part padding
html = html.replace(
  /\.ind-text-part \{\s*flex: 1\.1;\s*background: #fff;\s*padding: 20px 32px;/m,
  '.ind-text-part { \n  flex: 1.1; \n  background: #fff; \n  padding: 12px 32px;'
);
// Reduce tag margin top
html = html.replace(
  /\.ind-tags \{ display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; \}/g,
  '.ind-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }'
);
// Tighten paragraph line height
html = html.replace(
  /\.ind-text-part p \{ font-size: 14px; color: var\(--text-muted\); line-height: 1\.6; \}/g,
  '.ind-text-part p { font-size: 14px; color: var(--text-muted); line-height: 1.4; }'
);
// Tighten header margin bottom
html = html.replace(
  /\.ind-text-part h4 \{ font-family: var\(--display\); font-size: 24px; color: var\(--dark\); margin-bottom: 8px; \}/g,
  '.ind-text-part h4 { font-family: var(--display); font-size: 24px; color: var(--dark); margin-bottom: 4px; }'
);

fs.writeFileSync(indexPath, html);
console.log('Cards made longer and vertically shorter.');
