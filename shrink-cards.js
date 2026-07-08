const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Shrink .vwf-item
html = html.replace(/\.vwf-item \{ position: relative; z-index: 3; transform: scale\(1\); display: flex; align-items: center; padding: 24px; border-radius: 40px;/g, '.vwf-item { position: relative; z-index: 3; transform: scale(1); display: flex; align-items: center; padding: 16px 20px; border-radius: 24px;');

// If the regex above failed because of spacing, let's just do targeted replacements
html = html.replace(/padding: 24px; border-radius: 40px;/g, 'padding: 16px 20px; border-radius: 24px;');

// 2. Shrink icon box
html = html.replace(/width: 64px; height: 64px; border-radius: 20px;[^>]*font-size: 24px;/g, 'width: 48px; height: 48px; border-radius: 14px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 18px;');

// If that failed, let's be more precise
html = html.replace(/\.vwf-icon-box \{ width: 64px; height: 64px; border-radius: 20px; background: rgba\(255,255,255,0\.05\); display: flex; align-items: center; justify-content: center; font-size: 24px;/g, '.vwf-icon-box { width: 48px; height: 48px; border-radius: 14px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 18px;');

// 3. Shrink number box
html = html.replace(/\.vwf-num \{ width: 32px; height: 32px; border-radius: 50%;/g, '.vwf-num { width: 28px; height: 28px; border-radius: 50%;');
html = html.replace(/font-size: 11px; font-weight: 700;/g, 'font-size: 10px; font-weight: 700;');

// 4. Shrink dot
html = html.replace(/\.vwf-dot \{ width: 16px; height: 16px;/g, '.vwf-dot { width: 12px; height: 12px;');

// 5. Shrink text sizes
html = html.replace(/\.vwf-right h4 \{ font-size: 20px;/g, '.vwf-right h4 { font-size: 17px;');
html = html.replace(/\.vwf-right p \{ font-size: 14px;/g, '.vwf-right p { font-size: 13px;');

// 6. Fix header margin-bottom (100px was too much, making it too tall)
html = html.replace(/\.vwf-header \{ text-align: center; margin-bottom: 100px; \}/g, '.vwf-header { text-align: center; margin-bottom: 40px; }');

// 7. Fix timeline padding
html = html.replace(/\.vwf-timeline \{ position: relative; padding: 40px 0; \}/g, '.vwf-timeline { position: relative; padding: 20px 0; }');

fs.writeFileSync(indexPath, html);
console.log('Cards resized for a more polished look.');
