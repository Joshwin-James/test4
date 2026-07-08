const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const debugCode = /<!-- DEBUG BOX -->[\s\S]*?<\/script>/;

if (html.match(debugCode)) {
  html = html.replace(debugCode, '');
  fs.writeFileSync(indexPath, html);
  console.log('Removed debug box from HTML.');
} else {
  console.log('Debug box not found.');
}
