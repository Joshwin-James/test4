const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Constrain timeline width and align line to left
html = html.replace(/\.vwf-timeline \{ position: relative; padding: 20px 0; \}/, '.vwf-timeline { position: relative; padding: 20px 0; max-width: 800px; margin: 0 auto; }');
html = html.replace(/\.vwf-line-bg \{ position: absolute; left: 50%;/g, '.vwf-line-bg { position: absolute; left: 48px;');
html = html.replace(/\.vwf-progress \{ position: absolute; left: 50%;/g, '.vwf-progress { position: absolute; left: 48px;');

// 2. Adjust .vwf-left to sit on the left, next to the line
html = html.replace(/\.vwf-left \{ flex: 1; display: flex; justify-content: flex-end; align-items: center; gap: 24px; padding-right: 60px; \}/g, '.vwf-left { flex: 0 0 auto; display: flex; justify-content: flex-start; align-items: center; gap: 16px; padding-left: 80px; padding-right: 24px; }');

// 3. Absolute position the dot on the left line
html = html.replace(/\.vwf-center \{ width: 24px; display: flex; justify-content: center; align-items: center; \}/g, '.vwf-center { position: absolute; left: 48px; top: 50%; transform: translate(-50%, -50%); width: auto; display: flex; justify-content: center; align-items: center; }');

// 4. Adjust .vwf-right to not have massive left padding
html = html.replace(/\.vwf-right \{ flex: 1; padding-left: 60px; text-align: left; \}/g, '.vwf-right { flex: 1; padding-left: 0; text-align: left; }');

fs.writeFileSync(indexPath, html);
console.log('Converted to left-aligned timeline layout.');
