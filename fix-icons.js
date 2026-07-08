const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Add FontAwesome CDN if not present
if (!html.includes('font-awesome')) {
  const faCDN = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n</head>';
  html = html.replace('</head>', faCDN);
}

// 2. Replace the blank <i> tags with the appropriate new FontAwesome 6 Solid icons requested by the user
html = html.replace(/<i class="fa fa-line-chart"><\/i>/g, '<i class="fa-solid fa-handshake"></i>');
html = html.replace(/<i class="fa fa-sitemap"><\/i>/g, '<i class="fa-solid fa-pen-ruler"></i>');
html = html.replace(/<i class="fa fa-search"><\/i>/g, '<i class="fa-solid fa-clipboard-check"></i>');

fs.writeFileSync(indexPath, html);
console.log('FontAwesome injected and icons updated.');
