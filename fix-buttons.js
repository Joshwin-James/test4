const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Update the HTML icons to < and > (using html entities for angle brackets / chevrons)
html = html.replace(
  /<button class="test-btn" id="prevTestBtn" aria-label="Previous Review">←<\/button>/g,
  '<button class="test-btn" id="prevTestBtn" aria-label="Previous Review">&#10094;</button>'
);
html = html.replace(
  /<button class="test-btn" id="nextTestBtn" aria-label="Next Review">→<\/button>/g,
  '<button class="test-btn" id="nextTestBtn" aria-label="Next Review">&#10095;</button>'
);

// 2. Force inject the premium rounded button CSS right before </style> to ensure it applies
const premiumButtonCSS = `
.test-btn { 
  width: 64px !important; 
  height: 64px !important; 
  border-radius: 50% !important; 
  background: rgba(255,255,255,0.1) !important; 
  border: 1px solid rgba(255,255,255,0.4) !important; 
  color: #fff !important; 
  font-size: 24px !important; 
  cursor: pointer !important; 
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important; 
  display: flex !important; 
  align-items: center !important; 
  justify-content: center !important; 
  backdrop-filter: blur(10px) !important; 
  -webkit-backdrop-filter: blur(10px) !important; 
  box-shadow: 0 8px 32px rgba(0,0,0,0.3) !important; 
}
.test-btn:hover { 
  background: #fff !important; 
  color: #0f172a !important; 
  transform: translateY(-4px) scale(1.05) !important; 
  box-shadow: 0 16px 40px rgba(0,0,0,0.4) !important; 
  border-color: #fff !important; 
}
`;

html = html.replace(/<\/style>/, premiumButtonCSS + '\n</style>');

fs.writeFileSync(indexPath, html);
console.log('Premium chevron icons and forced rounded CSS applied.');
