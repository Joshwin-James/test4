const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// ==========================================
// 1. RE-IMPLEMENT WHY CHOOSE US GSAP PINNING
// ==========================================

const whyHtmlRegex = /<!-- ══════════════ WHY CHOOSE US — STATIC EXCELLENCE SHOWCASE ══════════════ -->[\s\S]*?<\/section>/;
const newWhyHtml = `<!-- ══════════════ WHY CHOOSE US — PINNED PARTICLE SCROLL ══════════════ -->
<section id="why" class="why-pinned-section">
  <canvas id="why-canvas"></canvas>
  
  <div class="why-scroll-container">
    <div class="why-header">
      <div class="slabel rv" style="justify-content:center">Why Choose Us</div>
      <h2 class="stitle rv d1" style="color:var(--dark)">The Firm Behind<br><span style="color:var(--grey);font-style:italic">Your Growth</span></h2>
    </div>

    <div class="why-content-wrapper">
      <div class="why-item">
        <div class="w-num">2500<span>+</span></div>
        <h4>Happy Clients</h4>
        <p>Every query receives a response within 24 hours. We prioritize your time.</p>
      </div>
      <div class="why-item">
        <div class="w-num">10<span>+</span></div>
        <h4>Years Experience</h4>
        <p>CAs, CMAs & Legal Experts working together for the best outcome.</p>
      </div>
      <div class="why-item">
        <div class="w-num">5000<span>+</span></div>
        <h4>Businesses Served</h4>
        <p>Serving clients across all 28 states remotely with a digital-first approach.</p>
      </div>
      <div class="why-item">
        <div class="w-num">100<span>%</span></div>
        <h4>Confidentiality</h4>
        <p>Your financial data is handled with the highest levels of confidentiality.</p>
      </div>
    </div>
  </div>
</section>`;

if(html.match(whyHtmlRegex)) {
  html = html.replace(whyHtmlRegex, newWhyHtml);
}

const whyCssRegex = /\/\* ── WHY CHOOSE US \(STATIC SHOWCASE\) ───[\s\S]*?\/\* ── INDUSTRIES \(STICKY SPLIT\)/m;
const newWhyCss = `/* ── WHY CHOOSE US (PINNED SCROLL) ────────────────────────────────── */
#why { background: #fff; position: relative; overflow: hidden; }
#why-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: 0.4; }
.why-pinned-section { min-height: 100vh; position: relative; }
.why-scroll-container { width: 100%; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; z-index: 2; padding: 0 24px; }
.why-header { text-align: center; margin-bottom: 60px; position: absolute; top: 15vh; width: 100%; }
.why-content-wrapper { position: relative; width: 100%; max-width: 600px; height: 300px; display: flex; justify-content: center; align-items: center; }
.why-item { position: absolute; text-align: center; opacity: 0; visibility: hidden; transform: translateY(40px); background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); padding: 48px; border-radius: var(--r-xl); border: 1px solid var(--border-subtle); box-shadow: var(--sh-md); width: 100%; }
.w-num { font-family: var(--display); font-size: clamp(48px, 6vw, 72px); font-weight: 500; color: var(--dark); line-height: 1; margin-bottom: 12px; }
.w-num span { color: var(--orange); }
.why-item h4 { font-family: var(--sans); font-size: 24px; font-weight: 600; color: var(--dark); margin-bottom: 8px; }
.why-item p { font-size: 16px; color: var(--text-muted); line-height: 1.6; }

/* ── INDUSTRIES (STICKY SPLIT)`;

if(html.match(whyCssRegex)) {
  html = html.replace(whyCssRegex, newWhyCss);
}


// ==========================================
// 2. FIX INDUSTRY FOCUS CLIPPING & WHITESPACE
// ==========================================

const indCssRegex = /\/\* ── INDUSTRIES \(STICKY SPLIT\)[\s\S]*?\/\* ── WORKFLOW/m;
const newIndCss = `/* ── INDUSTRIES (STICKY SPLIT) ────────────────────────────────── */
#industries { background: var(--bg-secondary); position: relative; padding: 100px 0 60px 0; border-bottom: 1px solid var(--border-subtle); z-index: 5; }
.ind-split-container { display: flex; max-width: 1200px; margin: 0 auto; padding: 0 24px; gap: 80px; position: relative; align-items: flex-start; }

/* Left Panel - Sticky Wrapper */
.ind-left-panel { 
  flex: 1; 
  position: sticky; 
  top: 15vh; /* Enough space from top so it doesn't clip */
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: flex-start;
  max-height: 80vh; /* Ensure it never exceeds viewport */
}

/* Header goes INSIDE the sticky left panel to perfectly sync with images without hacky separate sticky containers */
.ind-header-in-sticky { text-align: left; width: 100%; margin-bottom: 32px; }

.ind-img-stack { position: relative; width: 100%; max-width: 450px; aspect-ratio: 4/3; border-radius: var(--r-xl); overflow: hidden; box-shadow: var(--sh-premium); }
.ind-img-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
.ind-img-wrapper.active { opacity: 1; transform: translateY(0); z-index: 2; }
.ind-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }

/* Right Panel - Scrolling text */
.ind-right-panel { flex: 1; display: flex; flex-direction: column; padding-top: 10vh; padding-bottom: 5vh; }
.ind-text-block { background: #fff; padding: 48px; border-radius: var(--r-xl); border: 1px solid var(--border-subtle); box-shadow: var(--sh-sm); opacity: 0.2; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); margin-bottom: 50vh; }
.ind-text-block:last-child { margin-bottom: 0; } /* Removes dead whitespace at end of section */
.ind-text-block.active { opacity: 1; transform: translateY(0); box-shadow: var(--sh-premium); border-color: rgba(15,23,42,0.2); }
.ind-text-block h4 { font-family: var(--display); font-size: 32px; color: var(--dark); margin-bottom: 16px; }
.ind-text-block p { font-size: 16px; color: var(--text-muted); line-height: 1.7; }
.ind-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.ind-tag { font-size: 11px; font-weight: 600; color: var(--dark); background: var(--bg-secondary); padding: 8px 16px; border-radius: var(--r-md); text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid var(--border-subtle); }

@media(max-width: 900px) {
  .ind-split-container { flex-direction: column; gap: 40px; }
  .ind-left-panel { position: relative; top: 0; max-height: none; margin-bottom: 20px; }
  .ind-img-stack { max-width: 100%; aspect-ratio: 16/9; }
  .ind-right-panel { padding: 0; }
  .ind-text-block { opacity: 1; transform: none; margin-bottom: 40px; }
  .ind-text-block:last-child { margin-bottom: 0; }
}

/* ── WORKFLOW`;

html = html.replace(indCssRegex, newIndCss);

// Let's also adjust the HTML for #industries to move the header into the left panel so it sticks flawlessly
const indHtmlRegex = /<!-- ══════════════ INDUSTRIES — STICKY SPLIT SCREEN ══════════════ -->[\s\S]*?<\/section>/;
const newIndHtml = `<!-- ══════════════ INDUSTRIES — STICKY SPLIT SCREEN ══════════════ -->
<section id="industries">
  <div class="ind-split-container">
    <div class="ind-left-panel">
      <div class="ind-header-in-sticky">
        <div class="slabel" style="justify-content:flex-start">Industry Focus</div>
        <h2 class="stitle" style="color:var(--dark)">Expertise Across<br><span style="color:var(--grey);font-style:italic">Key Sectors</span></h2>
      </div>
      <div class="ind-img-stack">
        <div class="ind-img-wrapper active" id="img-health"><img src="ind_health.png" alt="Healthcare"></div>
        <div class="ind-img-wrapper" id="img-retail"><img src="ind_retail.png" alt="Retail"></div>
        <div class="ind-img-wrapper" id="img-mfg"><img src="ind_mfg.png" alt="Manufacturing"></div>
        <div class="ind-img-wrapper" id="img-it"><img src="ind_it.png" alt="Information Tech"></div>
      </div>
    </div>
    
    <div class="ind-right-panel">
      <div class="ind-text-block active" data-target="img-health">
        <h4>Healthcare</h4>
        <p>Modern hospital administration, medical billing, clinic accounting and healthcare compliance.</p>
        <div class="ind-tags"><span class="ind-tag">Hospital Admin</span><span class="ind-tag">Doctors</span></div>
      </div>
      <div class="ind-text-block" data-target="img-retail">
        <h4>Retail</h4>
        <p>Luxury retail stores, inventory reporting, multi-branch accounting and POS reconciliation.</p>
        <div class="ind-tags"><span class="ind-tag">Inventory</span><span class="ind-tag">POS</span></div>
      </div>
      <div class="ind-text-block" data-target="img-mfg">
        <h4>Manufacturing</h4>
        <p>Factory management, industrial accounting, compliance reporting and cost optimization.</p>
        <div class="ind-tags"><span class="ind-tag">Costing</span><span class="ind-tag">Compliance</span></div>
      </div>
      <div class="ind-text-block" data-target="img-it">
        <h4>Information Tech</h4>
        <p>Software startups, SaaS accounting, DPIIT recognition, and international tax structuring.</p>
        <div class="ind-tags"><span class="ind-tag">Startups</span><span class="ind-tag">SaaS</span></div>
      </div>
    </div>
  </div>
</section>`;

html = html.replace(indHtmlRegex, newIndHtml);


// ==========================================
// 3. REWRITE JS TO RESTORE WHY GSAP AND FIX IND GSAP
// ==========================================

const jsRegex = /\/\/ --- WHY CHOOSE US EXCELLENCE COUNTERS ---[\s\S]*?\/\/ --- PARTICLE CANVAS FOR #WHY ---/m;
const newJs = `// --- WHY CHOOSE US GSAP ANIMATION ---
        const whyItems = gsap.utils.toArray('.why-item');
        if(whyItems.length > 0) {
          const whyTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#why",
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: 1
            }
          });
          
          whyItems.forEach((item, i) => {
            whyTl.to(item, { autoAlpha: 1, y: 0, duration: 1 })
                 .to(item, { autoAlpha: 0, y: -40, duration: 1, delay: 0.5 });
          });
        }

        // --- INDUSTRY FOCUS STICKY SCROLL ---
        const indBlocks = gsap.utils.toArray('.ind-text-block');
        if(indBlocks.length > 0 && window.innerWidth > 900) {
          indBlocks.forEach((block, i) => {
            ScrollTrigger.create({
              trigger: block,
              start: "top 60%", // Triggers when the top of the block hits slightly below middle of viewport
              end: "bottom 40%",
              onEnter: () => activateInd(block),
              onEnterBack: () => activateInd(block)
            });
          });
          
          function activateInd(block) {
            indBlocks.forEach(b => b.classList.remove('active'));
            block.classList.add('active');
            const targetId = block.getAttribute('data-target');
            document.querySelectorAll('.ind-img-wrapper').forEach(img => {
              if (img.id === targetId) {
                img.classList.add('active');
              } else {
                img.classList.remove('active');
              }
            });
          }
        }

        // --- PARTICLE CANVAS FOR #WHY ---`;

if(html.match(jsRegex)) {
  html = html.replace(jsRegex, newJs);
} else {
  // If the regex failed because it was the old JS
  const fallbackJsRegex = /\/\/ --- WHY CHOOSE US GSAP ANIMATION ---[\s\S]*?\/\/ --- PARTICLE CANVAS FOR #WHY ---/m;
  if(html.match(fallbackJsRegex)) {
    html = html.replace(fallbackJsRegex, newJs);
  }
}

fs.writeFileSync(indexPath, html);
console.log('Fixed clipping, whitespace, and restored GSAP pinning perfectly.');
