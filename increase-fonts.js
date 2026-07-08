const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

html = html.replace(
  /\.hero-title\{.*?font-size:clamp\(48px, 7vw, 100px\)/g,
  (match) => match.replace('clamp(48px, 7vw, 100px)', 'clamp(56px, 8vw, 112px)')
);

html = html.replace(
  /\.stitle\{.*?font-size:clamp\(40px,6vw,72px\)/g,
  (match) => match.replace('clamp(40px,6vw,72px)', 'clamp(48px, 7vw, 84px)')
);

html = html.replace(
  /\.services-header h2 \{.*?font-size: clamp\(40px, 6vw, 64px\)/g,
  (match) => match.replace('clamp(40px, 6vw, 64px)', 'clamp(48px, 7vw, 76px)')
);

html = html.replace(
  /\.contact-left h2\{.*?font-size:clamp\(36px,4vw,56px\)/g,
  (match) => match.replace('clamp(36px,4vw,56px)', 'clamp(42px, 5vw, 68px)')
);

html = html.replace(
  /\.about-q\{.*?font-size:clamp\(24px,2\.5vw,36px\)/g,
  (match) => match.replace('clamp(24px,2.5vw,36px)', 'clamp(28px, 3.5vw, 42px)')
);

fs.writeFileSync(indexPath, html);
console.log('Increased heading font sizes.');
