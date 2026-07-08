const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Remove the "004 . PROCESS" label
html = html.replace(/<div class="vwf-label">[\s\S]*?<\/div>/, '');

// 2. Adjust CSS Padding and Margins for tighter layout
html = html.replace(/#workflow \{ background: var\(--dark\); padding: 120px 0;/g, '#workflow { background: var(--dark); padding: 60px 0;');
html = html.replace(/\.vwf-header \{ text-align: center; margin-bottom: 80px; \}/g, '.vwf-header { text-align: center; margin-bottom: 40px; }');
html = html.replace(/\.vwf-timeline \{ position: relative; padding: 40px 0; \}/g, '.vwf-timeline { position: relative; padding: 20px 0; }');

// 3. Fix GSAP ScrollTrigger to ensure only ONE card is active at a time
const oldGsap = /vwfItems\.forEach\(\(item, i\) => \{[\s\S]*?\}\);/g;
const newGsap = `vwfItems.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 50%",
      end: "bottom 50%",
      toggleClass: "active"
    });
  });`;

html = html.replace(oldGsap, newGsap);

fs.writeFileSync(indexPath, html);
console.log('Workflow section trimmed and GSAP logic updated for mutually exclusive active states.');
