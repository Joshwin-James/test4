const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// The CSS we need to guarantee is in the file
const cssToInject = `
.test-slider-container { position: relative; width: 100%; max-width: 750px; height: 350px; margin: 0 auto; perspective: 1000px; }
.test-stack { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.stack-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; }
.tcard { background: rgba(255,255,255,0.03); border-radius: 32px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); width: 100%; height: 100%; box-sizing: border-box; text-align: left; box-shadow: 0 20px 40px rgba(0,0,0,0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; justify-content: center; }
`;

// Insert the CSS right before the closing </style> tag
html = html.replace(/<\/style>/, cssToInject + '\n</style>');

// Also let's clean up the old inline styles on .test-slider-container and .test-stack just in case they conflict
html = html.replace(/<div class="test-slider-container".*?>/, '<div class="test-slider-container">');
html = html.replace(/<div class="test-stack" id="testStack".*?>/, '<div class="test-stack" id="testStack">');

fs.writeFileSync(indexPath, html);
console.log('Force injected absolute stacking CSS.');
