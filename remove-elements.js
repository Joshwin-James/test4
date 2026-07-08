const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Remove the "Trusted by 2500+" line.
// We'll target the whole div if we can, or just empty the text
html = html.replace(/<div class="hero-trust[^>]*>[\s\S]*?<\/div>/, '');
// Alternatively if it's not .hero-trust, just remove the text directly
html = html.replace(/Trusted by 2500\+ Businesses Across India/g, '');

// 2. Remove the scroll to explore downward arrow
html = html.replace(/<div class="scroll-indicator" id="scrollInd">[\s\S]*?<\/div>\s*<\/div>/, '');
// If the regex above misses, also remove by class
html = html.replace(/<div class="si-txt">Scroll to Explore<\/div>/g, '');
html = html.replace(/<div class="si-arr">.*?<\/div>/g, '');

// 3. Remove the scroll to top arrow (#btt)
// Remove the HTML button
html = html.replace(/<button id="btt" onclick="scrollToTop\(\)" aria-label="Scroll to top">↑<\/button>/g, '');
// If it's a div
html = html.replace(/<div id="btt"[\s\S]*?<\/div>/g, '');
html = html.replace(/<button id="btt"[\s\S]*?<\/button>/g, '');

// Optionally remove the GSAP or script logic associated with it to prevent console errors
html = html.replace(/const btt = document\.getElementById\('btt'\);[\s\S]*?if\s*\(btt\)[\s\S]*?\}\)/g, '');

fs.writeFileSync(indexPath, html);
console.log('Removed trusted text, scroll to explore, and scroll to top arrow.');
