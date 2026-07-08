const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Revert the max-width to a slim size
html = html.replace(
  /\.ind-cards-stack-container \{[\s\S]*?max-width: 1050px;/m,
  '.ind-cards-stack-container { \n  position: relative; \n  width: 100%;\n  max-width: 480px;'
);

// Increase border radius for the "screen with rounded edges" look
html = html.replace(
  /\.ind-cards-stack-container \{([\s\S]*?)border-radius: var\(--r-xl\);/m,
  '.ind-cards-stack-container {$1border-radius: 32px;'
);
html = html.replace(
  /\.ind-card-inner \{([\s\S]*?)border-radius: var\(--r-xl\);/m,
  '.ind-card-inner {$1border-radius: 32px;'
);

// Switch flex-direction to column to make it a tall "screen" layout
html = html.replace(
  /\.ind-card-inner \{([\s\S]*?)align-items: stretch;/m,
  '.ind-card-inner {$1align-items: stretch; \n  flex-direction: column;'
);

// Set image height since it's now a column
html = html.replace(
  /\.ind-img-part \{ \n  flex: 1; \n  overflow: hidden; \n\}/m,
  '.ind-img-part { \n  flex: none; \n  height: 340px; \n  overflow: hidden; \n}'
);

// Revert text padding and margins to make it breathe vertically
html = html.replace(
  /\.ind-text-part \{ \n  flex: 1\.1; \n  background: #fff; \n  padding: 12px 32px;/m,
  '.ind-text-part { \n  flex: 1; \n  background: #fff; \n  padding: 32px 32px 40px;'
);

html = html.replace(
  /\.ind-tags \{ display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; \}/g,
  '.ind-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }'
);

html = html.replace(
  /\.ind-text-part p \{ font-size: 14px; color: var\(--text-muted\); line-height: 1\.4; \}/g,
  '.ind-text-part p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }'
);

html = html.replace(
  /\.ind-text-part h4 \{ font-family: var\(--display\); font-size: 24px; color: var\(--dark\); margin-bottom: 4px; \}/g,
  '.ind-text-part h4 { font-family: var(--display); font-size: 24px; color: var(--dark); margin-bottom: 12px; }'
);

fs.writeFileSync(indexPath, html);
console.log('Cards made slim and vertical.');
