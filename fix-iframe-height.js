const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Fix the iframe CSS to fill the container height instead of being hardcoded to 240px
html = html.replace(
  /\.map-wrap iframe\{display:block;width:100%;height:240px;border:0;filter:grayscale\(100%\) contrast\(1\.1\)\}/g,
  '.map-wrap iframe{display:block;width:100%;height:100%;border:0;filter:grayscale(100%) contrast(1.1)}'
);

// 2. Adjust the inline style of the map-wrap to ensure it's a good height (e.g., 400px)
html = html.replace(
  /<div class="map-wrap" style="height: 320px; margin-top: 0; width: 100%;">/g,
  '<div class="map-wrap" style="height: 400px; margin-top: 0; width: 100%;">'
);

fs.writeFileSync(indexPath, html);
console.log('Fixed iframe height issue.');
