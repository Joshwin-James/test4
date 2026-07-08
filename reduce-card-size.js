const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Reduce container max-width
html = html.replace(
  /\.ind-cards-stack-container \{\s*position: relative;\s*width: 100%;\s*max-width: 1050px;/g,
  '.ind-cards-stack-container { \n  position: relative; \n  width: 100%;\n  max-width: 850px;'
);

// Reduce text padding
html = html.replace(
  /\.ind-text-part \{[\s\S]*?padding: 24px 40px;/g,
  '.ind-text-part { \n  flex: 1.1; \n  background: #fff; \n  padding: 20px 32px;'
);

// Reduce fonts
html = html.replace(
  /\.ind-text-part h4 \{ font-family: var\(--display\); font-size: 28px; color: var\(--dark\); margin-bottom: 12px; \}/g,
  '.ind-text-part h4 { font-family: var(--display); font-size: 24px; color: var(--dark); margin-bottom: 8px; }'
);
html = html.replace(
  /\.ind-text-part p \{ font-size: 15px; color: var\(--text-muted\); line-height: 1\.6; \}/g,
  '.ind-text-part p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }'
);

fs.writeFileSync(indexPath, html);
console.log('Reduced card size successfully.');
