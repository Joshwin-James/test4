const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. REPLACE HTML
const indHtmlRegex = /<!-- ══════════════ INDUSTRIES — STICKY SPLIT SCREEN ══════════════ -->[\s\S]*?<\/section>/;
const newIndHtml = `<!-- ══════════════ INDUSTRIES — STACKED CARDS ══════════════ -->
<section id="industries">
  <div class="ind-header-stacked">
    <div class="slabel rv" style="justify-content:center">Industry Focus</div>
    <h2 class="stitle rv d1" style="color:var(--dark)">Expertise Across<br><span style="color:var(--grey);font-style:italic">Key Sectors</span></h2>
  </div>
  
  <div class="ind-cards-stack-container">
    <!-- Card 1 -->
    <div class="ind-unified-card" id="ind-card-1">
      <div class="ind-card-inner">
        <div class="ind-img-part"><img src="ind_health.png" alt="Healthcare"></div>
        <div class="ind-text-part">
          <h4>Healthcare</h4>
          <p>Modern hospital administration, medical billing, clinic accounting and healthcare compliance.</p>
          <div class="ind-tags"><span class="ind-tag">Hospital Admin</span><span class="ind-tag">Doctors</span></div>
        </div>
      </div>
    </div>
    <!-- Card 2 -->
    <div class="ind-unified-card" id="ind-card-2">
      <div class="ind-card-inner">
        <div class="ind-img-part"><img src="ind_retail.png" alt="Retail"></div>
        <div class="ind-text-part">
          <h4>Retail</h4>
          <p>Luxury retail stores, inventory reporting, multi-branch accounting and POS reconciliation.</p>
          <div class="ind-tags"><span class="ind-tag">Inventory</span><span class="ind-tag">POS</span></div>
        </div>
      </div>
    </div>
    <!-- Card 3 -->
    <div class="ind-unified-card" id="ind-card-3">
      <div class="ind-card-inner">
        <div class="ind-img-part"><img src="ind_mfg.png" alt="Manufacturing"></div>
        <div class="ind-text-part">
          <h4>Manufacturing</h4>
          <p>Factory management, industrial accounting, compliance reporting and cost optimization.</p>
          <div class="ind-tags"><span class="ind-tag">Costing</span><span class="ind-tag">Compliance</span></div>
        </div>
      </div>
    </div>
    <!-- Card 4 -->
    <div class="ind-unified-card" id="ind-card-4">
      <div class="ind-card-inner">
        <div class="ind-img-part"><img src="ind_it.png" alt="Information Tech"></div>
        <div class="ind-text-part">
          <h4>Information Tech</h4>
          <p>Software startups, SaaS accounting, DPIIT recognition, and international tax structuring.</p>
          <div class="ind-tags"><span class="ind-tag">Startups</span><span class="ind-tag">SaaS</span></div>
        </div>
      </div>
    </div>
  </div>
</section>`;

html = html.replace(indHtmlRegex, newIndHtml);

// 2. REPLACE CSS
const indCssRegex = /\/\* ── INDUSTRIES \(STICKY SPLIT\) ───[\s\S]*?\/\* ── WORKFLOW/m;
const newIndCss = `/* ── INDUSTRIES (STACKED CARDS) ────────────────────────────────── */
#industries { background: var(--bg-secondary); position: relative; padding: 100px 0 60px 0; border-bottom: 1px solid var(--border-subtle); z-index: 5; }
.ind-header-stacked { text-align: center; margin-bottom: 60px; position: relative; z-index: 20; }
.ind-cards-stack-container { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 500px; overflow: hidden; border-radius: var(--r-xl); }

.ind-unified-card { 
  position: absolute; 
  top: 0; left: 0; 
  width: 100%; height: 100%; 
  display: flex; 
  justify-content: center; 
  transform-origin: center center; 
  will-change: transform, opacity, filter;
}
.ind-card-inner { 
  display: flex; 
  width: 100%; 
  height: 100%;
  gap: 60px; 
  align-items: stretch; 
  background: var(--bg-secondary); 
  border-radius: var(--r-xl);
}

.ind-img-part { 
  flex: 1; 
  border-radius: var(--r-xl); 
  overflow: hidden; 
  box-shadow: var(--sh-md); 
}
.ind-img-part img { 
  width: 100%; height: 100%; object-fit: cover; display: block; 
}

.ind-text-part { 
  flex: 1; 
  background: #fff; 
  padding: 48px; 
  border-radius: var(--r-xl); 
  border: 1px solid var(--border-subtle); 
  box-shadow: var(--sh-sm); 
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ind-text-part h4 { font-family: var(--display); font-size: 32px; color: var(--dark); margin-bottom: 16px; }
.ind-text-part p { font-size: 16px; color: var(--text-muted); line-height: 1.7; }
.ind-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.ind-tag { font-size: 11px; font-weight: 600; color: var(--dark); background: var(--bg-secondary); padding: 8px 16px; border-radius: var(--r-md); text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid var(--border-subtle); }

@media(max-width: 900px) {
  .ind-cards-stack-container { height: 750px; }
  .ind-card-inner { flex-direction: column; gap: 20px; }
  .ind-img-part { flex: none; height: 300px; }
  .ind-text-part { flex: 1; }
}

/* ── WORKFLOW`;

html = html.replace(indCssRegex, newIndCss);

// 3. REPLACE JS
const indJsRegex = /\/\/ --- INDUSTRY FOCUS STICKY SCROLL ---[\s\S]*?\/\/ --- PARTICLE CANVAS FOR #WHY ---/m;
const newIndJs = `// --- INDUSTRY FOCUS STACKED CARDS ---
        const indCards = gsap.utils.toArray('.ind-unified-card');
        if(indCards.length > 0 && window.innerWidth > 900) {
          // Setup initial state: stagger them slightly off the bottom
          indCards.forEach((card, i) => {
            if(i === 0) {
              gsap.set(card, { zIndex: 10, y: "0%" });
            } else {
              // The next card overlaps the bottom edge by a subtle amount (e.g., 64px, 48px, 32px)
              // This gives the "subtle hint" of a physical stack waiting beneath
              const overlap = 64 - (i * 16); 
              gsap.set(card, { zIndex: 10 + i, y: "calc(100% - " + overlap + "px)" });
            }
          });

          const indTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#industries",
              start: "top top", // Pin section at the top of the viewport
              end: "+=" + (indCards.length * 100) + "%", // Gives plenty of scroll space
              pin: true,
              scrub: 1,
            }
          });

          indCards.forEach((card, i) => {
            if (i === 0) return;
            const prevCard = indCards[i - 1];
            
            indTl.addLabel("card" + i)
              // Incoming card slides up fully over the previous card
              .to(card, { y: "0%", ease: "power1.inOut" }, "card" + i)
              // Outgoing card scales back slightly and fades for depth effect
              .to(prevCard, { scale: 0.98, opacity: 0.6, filter: "blur(2px)", ease: "power1.inOut" }, "card" + i);
          });
        }

        // --- PARTICLE CANVAS FOR #WHY ---`;

html = html.replace(indJsRegex, newIndJs);

fs.writeFileSync(indexPath, html);
console.log('Successfully applied Stacked Card logic!');
