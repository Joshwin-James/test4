const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldSvg = `<svg class="ico-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`;

const newSvg = `<svg class="ico-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="2" x2="12" y2="6" />
    <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" />
    <rect x="5" y="6" width="14" height="10" rx="3" />
    <path d="M5 10H3v4h2" />
    <path d="M19 10h2v4h-2" />
    <circle cx="9" cy="11" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="11" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M9 13.5 Q12 15.5 15 13.5" />
    <path d="M3 14v2a4 4 0 0 0 4 4h4" />
    <circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none"/>
  </svg>`;

if (html.includes(oldSvg)) {
  html = html.replace(oldSvg, newSvg);
  fs.writeFileSync(indexPath, html);
  console.log('Replaced headphone icon with custom robot headset icon.');
} else {
  console.log('Could not find the target SVG to replace.');
}
