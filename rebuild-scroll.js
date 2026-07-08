const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. REWRITE THE HTML for #why
const whyHtmlRegex = /<!-- ══════════════ WHY CHOOSE US — STATIC GRID ══════════════ -->[\s\S]*?<\/section>/;
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

html = html.replace(whyHtmlRegex, newWhyHtml);

// 2. REWRITE THE HTML for #industries
const indHtmlRegex = /<!-- ══════════════ INDUSTRIES — STATIC GRID ══════════════ -->[\s\S]*?<\/section>/;
const newIndHtml = `<!-- ══════════════ INDUSTRIES — STICKY SPLIT SCREEN ══════════════ -->
<section id="industries">
  <div class="ind-header-sticky">
    <div class="slabel rv" style="justify-content:center">Industry Focus</div>
    <h2 class="stitle rv d1" style="color:var(--dark)">Expertise Across<br><span style="color:var(--grey);font-style:italic">Key Sectors</span></h2>
  </div>
  
  <div class="ind-split-container">
    <div class="ind-left-panel">
      <div class="ind-img-stack">
        <div class="ind-img-wrapper" id="img-health" style="opacity: 1;"><img src="ind_health.png" alt="Healthcare"></div>
        <div class="ind-img-wrapper" id="img-retail"><img src="ind_retail.png" alt="Retail"></div>
        <div class="ind-img-wrapper" id="img-mfg"><img src="ind_mfg.png" alt="Manufacturing"></div>
        <div class="ind-img-wrapper" id="img-it"><img src="ind_it.png" alt="Information Tech"></div>
      </div>
    </div>
    
    <div class="ind-right-panel">
      <div class="ind-text-block" data-target="img-health">
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

// 3. REWRITE THE CSS for both
const oldCssRegex = /\/\* ── WHY CHOOSE US \(STATIC GRID\) ───[\s\S]*?\/\* ── WORKFLOW ───/m;

const newCss = `/* ── WHY CHOOSE US (PINNED SCROLL) ────────────────────────────────── */
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

/* ── INDUSTRIES (STICKY SPLIT) ────────────────────────────────── */
#industries { background: var(--bg-secondary); position: relative; padding: 60px 0; border-bottom: 1px solid var(--border-subtle); }
.ind-header-sticky { text-align: center; padding: 60px 24px; position: sticky; top: 80px; z-index: 10; background: linear-gradient(to bottom, var(--bg-secondary) 80%, transparent); }
.ind-split-container { display: flex; max-width: 1200px; margin: 0 auto; padding: 0 24px; gap: 60px; position: relative; }
.ind-left-panel { flex: 1; position: sticky; top: 250px; height: 50vh; display: flex; align-items: center; justify-content: center; }
.ind-img-stack { position: relative; width: 100%; max-width: 450px; aspect-ratio: 1/1; border-radius: var(--r-xl); overflow: hidden; box-shadow: var(--sh-premium); }
.ind-img-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.6s ease; }
.ind-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
.ind-right-panel { flex: 1; padding: 30vh 0 40vh 0; display: flex; flex-direction: column; gap: 80vh; }
.ind-text-block { background: #fff; padding: 48px; border-radius: var(--r-xl); border: 1px solid var(--border-subtle); box-shadow: var(--sh-sm); opacity: 0.3; transition: opacity 0.5s ease; }
.ind-text-block.active { opacity: 1; box-shadow: var(--sh-premium); }
.ind-text-block h4 { font-family: var(--display); font-size: 32px; color: var(--dark); margin-bottom: 16px; }
.ind-text-block p { font-size: 16px; color: var(--text-muted); line-height: 1.7; }
.ind-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.ind-tag { font-size: 11px; font-weight: 600; color: var(--dark); background: var(--bg-secondary); padding: 8px 16px; border-radius: var(--r-md); text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid var(--border-subtle); }

@media(max-width: 900px) {
  .ind-split-container { flex-direction: column; }
  .ind-left-panel { position: relative; top: 0; height: auto; margin-bottom: 40px; }
  .ind-img-stack { max-width: 100%; aspect-ratio: 16/9; }
  .ind-right-panel { padding: 0; gap: 40px; }
  .ind-text-block { opacity: 1; }
}

/* ── WORKFLOW ───`;

html = html.replace(oldCssRegex, newCss);

// 4. INJECT JS LOGIC AT THE END
const jsInject = `
        // --- WHY CHOOSE US GSAP ANIMATION ---
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
              start: "top center",
              end: "bottom center",
              onEnter: () => activateInd(block),
              onEnterBack: () => activateInd(block)
            });
          });
          
          function activateInd(block) {
            indBlocks.forEach(b => b.classList.remove('active'));
            block.classList.add('active');
            const targetId = block.getAttribute('data-target');
            gsap.utils.toArray('.ind-img-wrapper').forEach(img => {
              img.style.opacity = (img.id === targetId) ? "1" : "0";
            });
          }
        }

        // --- PARTICLE CANVAS FOR #WHY ---
        const canvas = document.getElementById('why-canvas');
        if(canvas) {
          const ctx = canvas.getContext('2d');
          let width, height, particles;
          
          function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for(let i = 0; i < 50; i++) {
              particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                size: Math.random() * 2 + 1
              });
            }
          }
          
          function drawCanvas() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.1)';
            
            particles.forEach((p, i) => {
              p.x += p.vx;
              p.y += p.vy;
              
              if(p.x < 0 || p.x > width) p.vx *= -1;
              if(p.y < 0 || p.y > height) p.vy *= -1;
              
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
              
              for(let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if(dist < 150) {
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
                }
              }
            });
            requestAnimationFrame(drawCanvas);
          }
          
          initCanvas();
          drawCanvas();
          window.addEventListener('resize', initCanvas);
        }
`;

const jsInsertPoint = html.lastIndexOf('});\n    </script>');
html = html.substring(0, jsInsertPoint) + jsInject + html.substring(jsInsertPoint);

fs.writeFileSync(indexPath, html);
console.log('Successfully rebuilt scroll animations and particle effects in index.html');
