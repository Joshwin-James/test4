const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldGsap = /\/\/ Pin the section and scrub timeline[\s\S]*?vwfTl\.fromTo\('#vwfProgress', \{ height: '0%' \}, \{ height: '100%', ease: 'none' \}\);/g;

const newGsap = `// Dynamic Header & Scroll Lock Timeline
  gsap.set('.vwf-header', { scale: 1.4, y: 80, transformOrigin: "center center" });
  gsap.set('.vwf-timeline', { autoAlpha: 0, y: 40 });

  const vwfTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#workflow",
      start: "center center", 
      end: "+=250%", 
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        let p = self.progress;
        if (p < 0.25) {
          vwfItems.forEach(item => item.classList.remove('active'));
        } else {
          let cardProgress = (p - 0.25) / 0.75;
          let activeIndex = Math.min(vwfItems.length - 1, Math.floor(cardProgress * vwfItems.length));
          
          vwfItems.forEach((item, i) => {
            if (i === activeIndex) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      }
    }
  });

  // Phase 1: Header Shrinks & Timeline Fades In (0% to 25%)
  vwfTl.to('.vwf-header', { scale: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0);
  vwfTl.to('.vwf-timeline', { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0);

  // Phase 2: Line Progress (25% to 100%)
  vwfTl.fromTo('#vwfProgress', { height: '0%' }, { height: '100%', ease: 'none', duration: 0.75 }, 0.25);`;

html = html.replace(oldGsap, newGsap);

fs.writeFileSync(indexPath, html);
console.log('2-stage dynamic header animation implemented.');
