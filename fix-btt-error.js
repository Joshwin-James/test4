const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const brokenBtt = `document.getElementById('btt').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});`;
const fixedBtt = `const bttBtn = document.getElementById('btt'); if(bttBtn) bttBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});`;

if (html.includes(brokenBtt)) {
  html = html.replace(brokenBtt, fixedBtt);
  fs.writeFileSync(indexPath, html);
  console.log('Fixed BTT null reference error.');
} else {
  console.log('Could not find the broken BTT line.');
}
