const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const brokenIndGsap = /const indCards = gsap\.utils\.toArray\('\.ind-unified-card'\);[\s\S]*?\}\);[\s\S]*?\}\);[\s\S]*?\}[\s\S]*?\/\/ --- PARTICLE CANVAS FOR #WHY ---/g;

const newIndGsap = `const indCards = gsap.utils.toArray('.ind-unified-card');
          if(indCards.length > 0 && window.innerWidth > 900) {
            
            indCards.forEach((card, i) => {
              if(i === 0) {
                gsap.set(card, { zIndex: 10, y: 0, scale: 1 });
              } else {
                // Stack cards physically underneath the active one with a subtle offset (e.g. 40px each)
                gsap.set(card, { zIndex: 10 - i, y: i * 40, scale: 1 });
              }
            });
  
            const indTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#industries",
                start: "top top", 
                // Calculate precise scroll distance to avoid dead space: 3 transitions = 300%
                end: "+=" + ((indCards.length - 1) * 100) + "%", 
                pin: true,
                scrub: 1
              }
            });
            
            // Subtle Header upward animation synced with start
            indTl.to('.ind-header-stacked', { y: -20, opacity: 0.85, scale: 0.98, ease: "power2.inOut" }, 0)
                 .to('.ind-cards-stack-container', { y: -10, ease: "power2.inOut" }, 0);
  
            indCards.forEach((card, i) => {
              if (i === 0) return;
              const prevCard = indCards[i - 1];
              
              indTl.addLabel("card" + i)
                // Dynamically pop the incoming card to the top z-index before animating it up
                .set(card, { zIndex: 20 + i }, "card" + i)
                // Slide incoming card up from its offset (e.g. 40px) to 0
                .to(card, { y: 0, ease: "power2.inOut" }, "card" + i)
                // Subtly push outgoing card back
                .to(prevCard, { scale: 0.98, opacity: 0.6, filter: "blur(2px)", ease: "power2.inOut" }, "card" + i);
            });
          }
  
          // --- PARTICLE CANVAS FOR #WHY ---`;

html = html.replace(brokenIndGsap, newIndGsap);

fs.writeFileSync(indexPath, html);
console.log('Fixed industry stacked cards animation.');
