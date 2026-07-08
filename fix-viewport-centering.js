const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// --- 1. FIX CSS TO 100VH CENTERING ---
const cssRegex = /\/\* ── INDUSTRIES \(STACKED CARDS\) ───[\s\S]*?\/\* ── WORKFLOW/m;
const newCss = `/* ── INDUSTRIES (STACKED CARDS) ────────────────────────────────── */
#industries { 
  background: var(--bg-secondary); 
  position: relative; 
  height: 100vh; /* Force perfect viewport fit */
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--border-subtle); 
  z-index: 5; 
  padding: 0 24px;
}
.ind-header-stacked { 
  text-align: center; 
  margin-bottom: 32px; 
  position: relative; 
  z-index: 20; 
  width: 100%;
}
.ind-cards-stack-container { 
  position: relative; 
  width: 100%;
  max-width: 1050px; 
  margin: 0 auto; 
  overflow: hidden; 
  border-radius: var(--r-xl); 
  box-shadow: var(--sh-xl); 
}

/* The unified card */
.ind-unified-card { 
  position: absolute; 
  top: 0; left: 0; 
  width: 100%; height: 100%; 
  display: flex; 
  justify-content: center; 
  transform-origin: center center; 
  will-change: transform, opacity;
  background: var(--bg-secondary);
}
/* Magic trick: First card is relative so it sets the container's height dynamically! */
.ind-unified-card:first-child {
  position: relative;
  height: auto;
}

.ind-card-inner { 
  display: flex; 
  width: 100%; 
  gap: 0; 
  align-items: stretch; 
  background: var(--bg-secondary); 
  border-radius: var(--r-xl);
}

.ind-img-part { 
  flex: 1; 
  overflow: hidden; 
}
.ind-img-part img { 
  width: 100%; height: 100%; object-fit: cover; display: block; 
}

.ind-text-part { 
  flex: 1.1; 
  background: #fff; 
  padding: 40px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ind-text-part h4 { font-family: var(--display); font-size: 28px; color: var(--dark); margin-bottom: 12px; }
.ind-text-part p { font-size: 15px; color: var(--text-muted); line-height: 1.6; }
.ind-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.ind-tag { font-size: 11px; font-weight: 600; color: var(--dark); background: var(--bg-secondary); padding: 6px 12px; border-radius: var(--r-md); text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid var(--border-subtle); }

@media(max-width: 900px) {
  #industries { height: auto; padding: 100px 24px; }
  .ind-card-inner { flex-direction: column; }
  .ind-img-part { flex: none; height: 300px; }
  .ind-text-part { padding: 32px; }
}

/* ── WORKFLOW`;
html = html.replace(cssRegex, newCss);


// --- 2. UPDATE GSAP SCRIPT IF NEEDED ---
// Re-write the GSAP slightly to ensure the upward shift centers it perfectly
const jsRegex = /\/\/ --- INDUSTRY FOCUS STACKED CARDS ---[\s\S]*?\/\/ --- PARTICLE CANVAS FOR #WHY ---/m;
const newJs = `// --- INDUSTRY FOCUS STACKED CARDS ---
        const indCards = gsap.utils.toArray('.ind-unified-card');
        if(indCards.length > 0 && window.innerWidth > 900) {
          
          indCards.forEach((card, i) => {
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
               .to('.ind-cards-stack-container', { y: -30, ease: "power2.inOut" }, 0);

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
console.log('Fixed viewport height and centering logic completely.');
