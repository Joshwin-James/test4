const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Remove the placeholder entirely
html = html.replace(/<div class="test-slide-placeholder"[\s\S]*?<\/div>\s*<\/div>/, '');

// 2. Fix the slider container to have a strict fixed size so it's small and compact
html = html.replace(
  /<div class="test-slider-container".*?>/,
  '<div class="test-slider-container" style="position: relative; width: 100%; max-width: 750px; height: 350px; margin: 0 auto; perspective: 1000px;">'
);

// 3. Make sure the stack wrapper is absolute if needed, or just let slides be absolute
html = html.replace(
  /<div class="test-stack" id="testStack">/,
  '<div class="test-stack" id="testStack" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">'
);

// 4. Update the tcard CSS to be smaller and fit the 350px height
html = html.replace(
  /\.tcard \{ background: rgba\(255,255,255,0\.03\); border-radius: 32px; padding: 56px 48px; border: 1px solid rgba\(255,255,255,0\.1\); max-width: 800px; margin: 0 auto; text-align: left; box-shadow: 0 20px 40px rgba\(0,0,0,0\.4\); backdrop-filter: blur\(12px\); -webkit-backdrop-filter: blur\(12px\); \}/,
  `.tcard { background: rgba(255,255,255,0.03); border-radius: 32px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); width: 100%; height: 100%; box-sizing: border-box; text-align: left; box-shadow: 0 20px 40px rgba(0,0,0,0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; justify-content: center; }`
);

// Reduce padding on the section so it's not "so long now"
html = html.replace(
  /#testimonials\{background:var\(--dark\);padding:120px 0\}/,
  '#testimonials{background:var(--dark);padding:60px 0}'
);

fs.writeFileSync(indexPath, html);
console.log('Fixed slider height and absolute positioning.');
