const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. REWRITE HTML
const oldHtmlRegex = /<!-- ══════════════ WHY CHOOSE US — PINNED PARTICLE SCROLL ══════════════ -->[\s\S]*?<\/section>/;
const newHtml = `<!-- ══════════════ WHY CHOOSE US — STATIC EXCELLENCE SHOWCASE ══════════════ -->
<section id="why" class="why-static-section">
  <canvas id="why-canvas"></canvas>
  
  <div class="why-static-container">
    <div class="why-header rv d1">
      <div class="slabel" style="justify-content:center">Why Choose Us</div>
      <h2 class="stitle" style="color:var(--dark)">The Firm Behind<br><span style="color:var(--grey);font-style:italic">Your Growth</span></h2>
    </div>

    <div class="why-metrics-grid">
      <div class="metric-card rv d2">
        <div class="m-num" data-val="18">0</div>
        <div class="m-title">Years Experience</div>
        <p class="m-desc">Industry trusted legacy</p>
      </div>
      <div class="metric-card rv d3">
        <div class="m-num" data-val="5000">0</div>
        <div class="m-title">Businesses Served</div>
        <p class="m-desc">From startups to enterprises</p>
      </div>
      <div class="metric-card rv d4">
        <div class="m-num" data-val="98">0</div>
        <div class="m-title">Client Retention</div>
        <p class="m-desc">Trusted by long-term partners</p>
      </div>
      <div class="metric-card rv d5">
        <div class="m-num" data-val="28">0</div>
        <div class="m-title">States Served</div>
        <p class="m-desc">Pan-India operational presence</p>
      </div>
    </div>
  </div>
</section>`;

html = html.replace(oldHtmlRegex, newHtml);

// 2. REWRITE CSS
const oldCssRegex = /\/\* ── WHY CHOOSE US \(PINNED SCROLL\) ───[\s\S]*?\/\* ── INDUSTRIES \(STICKY SPLIT\)/;
const newCss = `/* ── WHY CHOOSE US (STATIC SHOWCASE) ────────────────────────────────── */
#why { background: #fff; position: relative; overflow: hidden; padding: 140px 24px; }
#why-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: 0.6; }
.why-static-container { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 80px; }
.why-header { text-align: center; max-width: 600px; margin: 0 auto; }
.why-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }

.metric-card { 
  background: rgba(255, 255, 255, 0.6); 
  backdrop-filter: blur(16px); 
  -webkit-backdrop-filter: blur(16px); 
  border: 1px solid rgba(255, 255, 255, 0.9); 
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.4); 
  border-radius: var(--r-xl); 
  padding: 48px 32px; 
  text-align: center; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.metric-card:hover { 
  transform: translateY(-4px); 
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.6); 
}

.m-num { 
  font-family: 'Playfair Display', serif; 
  font-size: 56px; 
  font-weight: 600; 
  color: var(--dark); 
  line-height: 1; 
  margin-bottom: 16px;
}
.m-title { 
  font-family: var(--sans); 
  font-size: 18px; 
  font-weight: 600; 
  color: var(--dark); 
  margin-bottom: 8px;
}
.m-desc { 
  font-size: 14px; 
  color: var(--text-muted); 
  line-height: 1.5; 
}

@media(max-width: 1024px) {
  .why-metrics-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
}
@media(max-width: 600px) {
  .why-metrics-grid { grid-template-columns: 1fr; }
  #why { padding: 100px 24px; }
}

/* ── INDUSTRIES (STICKY SPLIT)`;

html = html.replace(oldCssRegex, newCss);

// 3. REWRITE JS logic for Why
// We need to remove the WHY CHOOSE US GSAP ANIMATION (pinning logic)
// and replace it with a ScrollTrigger counter logic.
const oldJsRegex = /\/\/ --- WHY CHOOSE US GSAP ANIMATION ---[\s\S]*?\/\/ --- INDUSTRY FOCUS STICKY SCROLL ---/;
const newJs = `// --- WHY CHOOSE US EXCELLENCE COUNTERS ---
        const metricCards = gsap.utils.toArray('.m-num');
        if(metricCards.length > 0) {
          ScrollTrigger.create({
            trigger: "#why",
            start: "top 75%",
            once: true,
            onEnter: () => {
              metricCards.forEach((el, i) => {
                const target = parseFloat(el.getAttribute('data-val'));
                let suffix = "";
                if(target === 18 || target === 5000) suffix = "+";
                if(target === 98) suffix = "%";
                
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: target,
                  duration: 2,
                  delay: i * 0.1 + 0.3, // staggered delay after heading
                  ease: "expo.out",
                  onUpdate: () => {
                    el.innerText = Math.floor(obj.val) + suffix;
                  }
                });
              });
            }
          });
        }

        // --- INDUSTRY FOCUS STICKY SCROLL ---`;

html = html.replace(oldJsRegex, newJs);

fs.writeFileSync(indexPath, html);
console.log('Successfully applied Static Excellence Showcase fixes!');
