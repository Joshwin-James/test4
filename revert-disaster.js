const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Revert max-width to a reasonable horizontal size
html = html.replace(
  /\.ind-cards-stack-container \{[\s\S]*?max-width: 480px;/m,
  '.ind-cards-stack-container { \n  position: relative; \n  width: 100%;\n  max-width: 950px;'
);

// Revert flex direction back to row
html = html.replace(
  /\.ind-card-inner \{([\s\S]*?)flex-direction: column;/m,
  '.ind-card-inner {$1flex-direction: row;'
);

// Revert image part height constraints
html = html.replace(
  /\.ind-img-part \{ \n  flex: none; \n  height: 340px; \n  overflow: hidden; \n\}/m,
  '.ind-img-part { \n  flex: 1; \n  overflow: hidden; \n  min-height: 450px;\n}'
);

fs.writeFileSync(indexPath, html);
console.log('Reverted to landscape layout.');
