const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. MAKE REVIEW CARD FONTS PURE WHITE FOR READABILITY
html = html.replace(
  /\.tq\{font-size:15px;color:rgba\(255,255,255,\.8\);line-height:1\.6;margin-bottom:16px;\}/g,
  '.tq{font-size:15px;color:#ffffff;line-height:1.6;margin-bottom:16px;}'
);
// Make sure names and roles are also readable
html = html.replace(
  /\.trole\{font-size:14px;color:rgba\(255,255,255,\.5\)\}/g,
  '.trole{font-size:14px;color:rgba(255,255,255,0.85)}'
);
// In case the trole regex fails because it's slightly different:
if(html.includes('.trole{')) {
    html = html.replace(/\.trole\{[^}]+\}/g, '.trole{font-size:14px;color:rgba(255,255,255,0.85)}');
}
html = html.replace(/\.tname\{font-weight:700;font-size:14px\}/g, '.tname{font-weight:700;font-size:15px;color:#ffffff}');

// 2. UPGRADE BUTTONS TO PREMIUM FINISH AND MAKE BIGGER
const oldBtnCSS = /\.test-btn \{ width: 56px; height: 56px; border-radius: 50%; background: rgba\(255,255,255,0\.05\); border: 1px solid rgba\(255,255,255,0\.2\); color: #fff; font-size: 20px; cursor: pointer; transition: all 0\.3s ease; display: flex; align-items: center; justify-content: center; \}\n\.test-btn:hover \{ background: #fff; color: var\(--dark\); transform: scale\(1\.05\); \}/g;
const newBtnCSS = `.test-btn { width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.4); color: #fff; font-size: 24px; cursor: pointer; transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
.test-btn:hover { background: #fff; color: var(--dark); transform: translateY(-4px) scale(1.05); box-shadow: 0 16px 40px rgba(0,0,0,0.4); border-color: #fff; }`;

if(oldBtnCSS.test(html)) {
  html = html.replace(oldBtnCSS, newBtnCSS);
} else {
  // Try fallback string replacement if regex fails due to formatting
  html = html.replace(
    /\.test-btn \{ width: 56px; height: 56px;[^}]+\}/g,
    `.test-btn { width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.4); color: #fff; font-size: 24px; cursor: pointer; transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }`
  );
  html = html.replace(
    /\.test-btn:hover \{ background: #fff; color: var\(--dark\); transform: scale\(1\.05\); \}/g,
    `.test-btn:hover { background: #fff; color: var(--dark); transform: translateY(-4px) scale(1.05); box-shadow: 0 16px 40px rgba(0,0,0,0.4); border-color: #fff; }`
  );
}

// 3. MOVE CONTROLS UPWARD
html = html.replace(
  /<div class="test-controls" style="display: flex; justify-content: center; gap: 16px; margin-top: 48px; position: relative; z-index: 50;">/g,
  '<div class="test-controls" style="display: flex; justify-content: center; gap: 24px; margin-top: 24px; position: relative; z-index: 50;">'
);


fs.writeFileSync(indexPath, html);
console.log('Premium buttons and pure white text applied.');
