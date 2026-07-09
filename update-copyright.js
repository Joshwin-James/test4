const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const regex = /Built with [\s\S]*? for Indian businesses\./;
const replacement = 'Made by <a href="https://codexorastudio.vercel.app/" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; font-weight: 600;">Codexora Studio</a>';

if (regex.test(html)) {
  html = html.replace(regex, replacement);
  fs.writeFileSync(indexPath, html);
  console.log('Updated footer copyright text with Codexora Studio link.');
} else {
  console.log('Could not find the target copyright text to replace.');
}
