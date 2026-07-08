const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const brokenGsap = /const vwfItems = gsap\.utils\.toArray\('\.vwf-item'\);[\s\S]*?vwfTl\.fromTo\('#vwfProgress'[\s\S]*?\n  \}/;

const fixedGsap = `const vwfItems = gsap.utils.toArray('.vwf-item');
  if (vwfItems.length > 0) {
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
            let lineProgress = (p - 0.25) / 0.75;
            const timelineHeight = document.querySelector('.vwf-timeline').offsetHeight;
            const dotThresholds = vwfItems.map(item => {
              const dot = item.querySelector('.vwf-center');
              return (item.offsetTop + dot.offsetTop + (dot.offsetHeight / 2)) / timelineHeight;
            });

            let activeIndex = -1;
            if (lineProgress >= dotThresholds[0]) activeIndex = 0;
            if (lineProgress >= dotThresholds[1]) activeIndex = 1;
            if (lineProgress >= dotThresholds[2]) activeIndex = 2;

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

    // Phase 1: Header Shrinks & Timeline Fades In
    vwfTl.to('.vwf-header', { scale: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0);
    vwfTl.to('.vwf-timeline', { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0);
  
    // Phase 2: Line Progress
    vwfTl.fromTo('#vwfProgress', { height: '0%' }, { height: '100%', ease: 'none', duration: 0.75 }, 0.25);
  }`;

html = html.replace(brokenGsap, fixedGsap);

fs.writeFileSync(indexPath, html);
console.log('Fixed broken GSAP block.');
