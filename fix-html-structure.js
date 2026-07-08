const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// The problematic block in HTML is:
// <div class="vwf-header rv d1">
//    <span>PROCESS</span></div>
//   <h2>How We Work</h2>

html = html.replace(/<div class="vwf-header rv d1">[\s\S]*?<h2>How We Work<\/h2>/, '<div class="vwf-header rv d1">\n      <h2>How We Work</h2>');

fs.writeFileSync(indexPath, html);
console.log('Fixed broken HTML structure in workflow section.');
