const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Refine scale (reduce height by 10% from 500px to 450px)
html = html.replace(
  /\.ind-cards-stack-container \{ position: relative; max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 500px;/g,
  '.ind-cards-stack-container { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 450px;'
);

// 2. Add heading and container repositioning animation to the GSAP timeline
const oldGsapLoop = `            indTl.addLabel("card" + i)
              .to(card, { yPercent: 0, y: 0, ease: "power2.inOut" }, "card" + i)
              .to(prevCard, { scale: 0.96, opacity: 0.4, ease: "power2.inOut" }, "card" + i);`;

const newGsapLoop = `            indTl.addLabel("card" + i)
              .to(card, { yPercent: 0, y: 0, ease: "power2.inOut" }, "card" + i)
              .to(prevCard, { scale: 0.96, opacity: 0.4, ease: "power2.inOut" }, "card" + i);
              
            // Reposition the header and container gracefully on the first transition
            if (i === 1) {
              indTl.to('.ind-header-stacked', { y: -80, opacity: 0.85, scale: 0.95, ease: "power2.inOut" }, "card" + i)
                   .to('.ind-cards-stack-container', { y: -50, ease: "power2.inOut" }, "card" + i);
            }`;

html = html.replace(oldGsapLoop, newGsapLoop);

fs.writeFileSync(indexPath, html);
console.log("Successfully refined composition!");
