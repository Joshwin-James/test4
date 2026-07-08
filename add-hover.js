const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const targetCSS = '.svc-nav-item.active .svc-nav-text { color: var(--text-primary); font-weight: 600; border-left: 2px solid var(--text-primary); padding-left: 16px; }';
const replacementCSS = targetCSS + `\n.svc-nav-item:not(.active):hover { transform: translateX(8px); }\n.svc-nav-item:not(.active):hover .svc-nav-text, .svc-nav-item:not(.active):hover .svc-nav-num { color: var(--text-primary); }`;

html = html.replace(targetCSS, replacementCSS);

fs.writeFileSync(indexPath, html);
console.log('Hover effect added to tabs.');
