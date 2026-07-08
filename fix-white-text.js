const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const forceWhiteCSS = `
.tq { color: #ffffff !important; font-size: 16px !important; line-height: 1.7 !important; }
.tq::before { color: #ffffff !important; opacity: 0.3 !important; }
.tstars { color: #ffb800 !important; } /* Golden stars */
.tname { color: #ffffff !important; font-size: 16px !important; font-weight: bold !important; }
.trole { color: rgba(255, 255, 255, 0.7) !important; font-size: 14px !important; }
`;

html = html.replace(/<\/style>/, forceWhiteCSS + '\n</style>');

fs.writeFileSync(indexPath, html);
console.log('Forced white text for reviews injected.');
