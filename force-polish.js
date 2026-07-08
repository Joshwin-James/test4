const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const brokenIndGsap = /const indCards = gsap\.utils\.toArray\('\.ind-unified-card'\);[\s\S]*?\}\);[\s\S]*?\}\);[\s\S]*?\}[\s\S]*?\/\/ --- PARTICLE CANVAS FOR #WHY ---/g;

const newIndGsap = `const indCards = gsap.utils.toArray('.ind-unified-card');
          if(indCards.length > 0 && window.innerWidth > 900) {
            
            // Initial setup for true physical stack without z-index jumps
            indCards.forEach((card, i) => {
              if(i === 0) {
                gsap.set(card, { zIndex: 10, yPercent: 0, scale: 1 });
              } else {
                // Ascending z-index so incoming slides OVER.
                // yPercent pushes it down so only the top edge peeks out (e.g. yPercent 90 means 10% overlap)
                gsap.set(card, { zIndex: 10 + i, yPercent: 92 + (i * 2), scale: 1 });
              }
            });
  
            const indTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#industries",
                start: "top top", 
                end: "+=" + ((indCards.length - 1) * 100) + "%", 
                pin: true,
                scrub: 1 // Keep scrub for smoothness, but we will remove blur and use ease: none
              }
            });
            
            // Subtle Header upward animation synced with start
            indTl.to('.ind-header-stacked', { y: -20, opacity: 0.85, scale: 0.98, ease: "none" }, 0)
                 .to('.ind-cards-stack-container', { y: -10, ease: "none" }, 0);
  
            indCards.forEach((card, i) => {
              if (i === 0) return;
              const prevCard = indCards[i - 1];
              
              indTl.addLabel("card" + i)
                // Slide incoming card up from yPercent:90+ to 0
                .to(card, { yPercent: 0, ease: "none" }, "card" + i)
                // Subtly push outgoing card back (removed blur to fix lag/jitter)
                .to(prevCard, { scale: 0.96, opacity: 0.4, ease: "none" }, "card" + i);
            });
          }
  
          // --- PARTICLE CANVAS FOR #WHY ---`;

html = html.replace(brokenIndGsap, newIndGsap);

fs.writeFileSync(indexPath, html);
console.log('Fixed industry stacked cards animation for premium smoothness.');
