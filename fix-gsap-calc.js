const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const jsRegex = /\/\/ --- INDUSTRY FOCUS STACKED CARDS ---[\s\S]*?\/\/ --- PARTICLE CANVAS FOR #WHY ---/m;

const newJs = `// --- INDUSTRY FOCUS STACKED CARDS ---
        const indCards = gsap.utils.toArray('.ind-unified-card');
        if(indCards.length > 0 && window.innerWidth > 900) {
          
          indCards.forEach((card, i) => {
            if(i === 0) {
              gsap.set(card, { zIndex: 10, yPercent: 0, y: 0 });
            } else {
              const overlap = 64 - (i * 16); 
              // By splitting yPercent and y, GSAP can flawlessly animate without choking on a calc() string!
              gsap.set(card, { zIndex: 10 + i, yPercent: 100, y: -overlap });
            }
          });

          const indTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#industries",
              start: "top top", 
              end: "+=" + (indCards.length * 75) + "%", // Slightly faster scroll
              pin: true,
              scrub: 1,
            }
          });

          indCards.forEach((card, i) => {
            if (i === 0) return;
            const prevCard = indCards[i - 1];
            
            indTl.addLabel("card" + i)
              .to(card, { yPercent: 0, y: 0, ease: "power2.inOut" }, "card" + i)
              .to(prevCard, { scale: 0.96, opacity: 0.4, ease: "power2.inOut" }, "card" + i);
          });
        }

        // --- PARTICLE CANVAS FOR #WHY ---`;

html = html.replace(jsRegex, newJs);
fs.writeFileSync(indexPath, html);
console.log('Fixed GSAP calc parsing error');
