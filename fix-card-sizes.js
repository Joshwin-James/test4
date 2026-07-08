const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Reduce the container height slightly since the cards will be smaller
html = html.replace(
  /\.test-slider-container \{ position: relative; width: 100%; max-width: 750px; height: 350px;/g,
  '.test-slider-container { position: relative; width: 100%; max-width: 750px; height: 280px;'
);

// 2. Reduce the size of the cards significantly (too big)
// Change padding from 40px to 24px 32px
html = html.replace(
  /\.tcard \{ background: rgba\(255,255,255,0\.03\); border-radius: 32px; padding: 40px;/g,
  '.tcard { background: rgba(255,255,255,0.03); border-radius: 24px; padding: 24px 32px;'
);

// 3. Reduce spacing between the review text and the name, and shrink font size slightly
html = html.replace(
  /\.tq\{font-size:18px;color:rgba\(255,255,255,\.9\);line-height:1\.8;margin-bottom:32px;\}/g,
  '.tq{font-size:15px;color:rgba(255,255,255,.8);line-height:1.6;margin-bottom:16px;}'
);

// We should also check if .tq is defined inline in the HTML because I might have left inline styles on the placeholder earlier
// Wait, I removed the placeholder. But let's check if .tcard has inline styles. No, it doesn't.
// Let's also shrink the .tau (author) area just in case it's huge
html = html.replace(
  /\.tav\{width:48px;height:48px;/g,
  '.tav{width:40px;height:40px;'
);
html = html.replace(
  /\.tname\{font-weight:700;font-size:15px\}/g,
  '.tname{font-weight:700;font-size:14px}'
);

// 4. Change the delay to 4 seconds (4000)
html = html.replace(
  /autoSlideInterval = setInterval\(nextSlide, 3000\);/g,
  'autoSlideInterval = setInterval(nextSlide, 4000);'
);

fs.writeFileSync(indexPath, html);
console.log('Fixed card sizes, overlap, and animation speed.');
