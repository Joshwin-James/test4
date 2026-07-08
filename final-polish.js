const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Reduce card vertical height by reducing padding
html = html.replace(
  /\.ind-text-part \{ \n  flex: 1\.1; \n  background: #fff; \n  padding: 40px;/g,
  '.ind-text-part { \n  flex: 1.1; \n  background: #fff; \n  padding: 24px 40px;'
);

// 2. Hide underneath cards completely & refine header animation height
const oldJs = `            indCards.forEach((card, i) => {
            if(i === 0) {
              gsap.set(card, { zIndex: 10, yPercent: 0, y: 0 });
            } else {
              const overlap = 64 - (i * 16); 
              gsap.set(card, { zIndex: 10 + i, yPercent: 100, y: -overlap });
            }
          });

          const indTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#industries",
              start: "top top", 
              end: "+=350%", 
              pin: true,
              scrub: 1,
            }
          });
          
          // Header upward animation synced with start
          indTl.to('.ind-header-stacked', { y: -60, opacity: 0.85, scale: 0.95, ease: "power2.inOut" }, 0)
               .to('.ind-cards-stack-container', { y: -30, ease: "power2.inOut" }, 0);`;

const newJs = `            indCards.forEach((card, i) => {
            if(i === 0) {
              gsap.set(card, { zIndex: 10, yPercent: 0, y: 0 });
            } else {
              // yPercent 100 and y 0 completely hides the card precisely below the container edge!
              gsap.set(card, { zIndex: 10 + i, yPercent: 100, y: 0 });
            }
          });

          const indTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#industries",
              start: "top top", 
              end: "+=350%", 
              pin: true,
              scrub: 1,
            }
          });
          
          // Header upward animation synced with start (reduced travel distance)
          indTl.to('.ind-header-stacked', { y: -30, opacity: 0.85, scale: 0.95, ease: "power2.inOut" }, 0)
               .to('.ind-cards-stack-container', { y: -15, ease: "power2.inOut" }, 0);`;

html = html.replace(oldJs, newJs);

fs.writeFileSync(indexPath, html);
console.log('Applied final polish tweaks.');
