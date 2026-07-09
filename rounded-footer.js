const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const regex = /footer\{background:var\(--dark\);padding:96px 24px 48px;border-top:1px solid rgba\(255,255,255,\.1\)\}/;

const newCss = `footer{background:var(--dark);padding:80px 40px 40px;margin:24px;border-radius:32px;}
@media(max-width: 900px){
  footer{margin:12px;border-radius:24px;padding:64px 24px 32px;}
}`;

if (regex.test(html)) {
  html = html.replace(regex, newCss);
  fs.writeFileSync(indexPath, html);
  console.log('Updated footer to float with rounded edges.');
} else {
  console.log('Could not find the target footer CSS to replace.');
}
