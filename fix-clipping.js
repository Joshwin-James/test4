const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldMath = `yPercent: 92 + (i * 2)`;
const newMath = `yPercent: 120`; // Push fully out of view to avoid clipped look

if (html.includes(oldMath)) {
  html = html.replace(oldMath, newMath);
  fs.writeFileSync(indexPath, html);
  console.log('Fixed card stacking to push fully out of view.');
} else {
  console.log('Could not find the target code to replace.');
}
