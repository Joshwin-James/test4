const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// The problematic HTML:
/*
    <div class="test-slider-container" style="position: relative; width: 100%; max-width: 700px; height: 260px; margin: 100px auto 0; perspective: 1000px;">
      <!-- Hidden placeholder to dictate container height based on content -->
      
      </div>
      
      <div class="test-stack" id="testStack">
*/

const brokenHTML = /<div class="test-slider-container"[^>]*>[\s\n]*<!-- Hidden placeholder to dictate container height based on content -->[\s\n]*<\/div>[\s\n]*<div class="test-stack" id="testStack">/;

const fixedHTML = `<div class="test-slider-container" style="position: relative; width: 100%; max-width: 700px; height: 260px; margin: 80px auto 0; perspective: 1000px;">
      <div class="test-stack" id="testStack">`;

if (brokenHTML.test(html)) {
  html = html.replace(brokenHTML, fixedHTML);
  fs.writeFileSync(indexPath, html);
  console.log('Fixed stray div closing the container prematurely.');
} else {
  // Try an alternative regex if the first one didn't match
  const altBroken = /<!-- Hidden placeholder to dictate container height based on content -->\s*<\/div>\s*<div class="test-stack"/;
  if(altBroken.test(html)) {
    html = html.replace(altBroken, '<div class="test-stack"');
    fs.writeFileSync(indexPath, html);
    console.log('Fixed stray div (alt).');
  } else {
    console.log('Could not find the stray div block to replace.');
  }
}
