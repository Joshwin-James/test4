const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Sidelot length venam (Make it very wide horizontally)
html = html.replace(
  /\.ind-cards-stack-container \{[\s\S]*?max-width: 950px;/m,
  '.ind-cards-stack-container { \n  position: relative; \n  width: 100%;\n  max-width: 1150px;'
);

// 2. Molilot short akanam (Make it very short vertically)
html = html.replace(
  /\.ind-img-part \{ \n  flex: 1; \n  overflow: hidden; \n  min-height: 450px;\n\}/m,
  '.ind-img-part { \n  flex: 1; \n  overflow: hidden; \n  min-height: 250px;\n  max-height: 280px;\n}'
);

html = html.replace(
  /\.ind-text-part \{ \n  flex: 1; \n  background: #fff; \n  padding: 32px 32px 40px;/m,
  '.ind-text-part { \n  flex: 1; \n  background: #fff; \n  padding: 12px 32px 16px;'
);

// Ensure the inner container also respects max-height to keep it slim
html = html.replace(
  /\.ind-card-inner \{([\s\S]*?)border-radius: 32px;/m,
  '.ind-card-inner {$1border-radius: 32px;\n  max-height: 280px;'
);

// Compress the text elements to fit the short vertical height comfortably
html = html.replace(
  /\.ind-text-part h4 \{ font-family: var\(--display\); font-size: 24px; color: var\(--dark\); margin-bottom: 12px; \}/g,
  '.ind-text-part h4 { font-family: var(--display); font-size: 22px; color: var(--dark); margin-bottom: 4px; }'
);

html = html.replace(
  /\.ind-text-part p \{ font-size: 14px; color: var\(--text-muted\); line-height: 1\.6; \}/g,
  '.ind-text-part p { font-size: 13px; color: var(--text-muted); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }'
);

html = html.replace(
  /\.ind-tags \{ display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; \}/g,
  '.ind-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }'
);

fs.writeFileSync(indexPath, html);
console.log('Cards made horizontally wide and vertically short.');
