const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');

// Extract the main script block
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (match) {
  fs.writeFileSync(path.join(__dirname, 'test-script.js'), match[1]);
  console.log('Script extracted to test-script.js');
} else {
  console.log('No script found');
}
