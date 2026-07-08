const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// The broken HTML looks like:
// <div class="svc-card-arrow">↗
//             </div>

// We need to replace it with:
// <div class="svc-card-arrow">↗</div>
//             </a>

html = html.replace(/<div class="svc-card-arrow">\u2197\s*<\/div>(?!\s*<\/a>)/g, '<div class="svc-card-arrow">↗</div>\n            </a>');

fs.writeFileSync(indexPath, html);
console.log('Fixed unclosed a tags in index.html');
