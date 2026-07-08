const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Remove old workflow CSS
html = html.replace(/#workflow\{background:var\(--dark\);padding:96px 0\}[\s\S]*?\.wf-d\{font-size:13px;color:rgba\(255,255,255,\.4\);line-height:1\.6;max-width:160px\}/, '');

// 2. Add new Vertical Workflow CSS
const verticalCss = `
/* ── VERTICAL WORKFLOW ────────────────────────────── */
#workflow { background: #ffffff; padding: 120px 0; font-family: var(--body); color: var(--dark); overflow: hidden; }
.vwf-container { max-width: 900px; margin: 0 auto; padding: 0 24px; }
.vwf-header { text-align: center; margin-bottom: 80px; }
.vwf-label { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 6px 16px; border: 1px solid #e2e8f0; border-radius: 40px; margin-bottom: 24px; color: #64748b; text-transform: uppercase; }
.vwf-label-dot { width: 6px; height: 6px; background: var(--dark); border-radius: 50%; }
.vwf-header h2 { font-family: var(--display); font-size: clamp(36px, 5vw, 56px); font-weight: 700; margin-bottom: 20px; color: #0f172a; }
.vwf-header p { font-size: 16px; color: #64748b; max-width: 600px; margin: 0 auto; line-height: 1.6; }

.vwf-timeline { position: relative; padding: 40px 0; }
.vwf-line-bg { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: #f1f5f9; transform: translateX(-50%); z-index: 1; }
.vwf-progress { position: absolute; left: 50%; top: 0; width: 2px; background: linear-gradient(180deg, transparent 0%, #3b82f6 50%, #a855f7 100%); transform: translateX(-50%); z-index: 2; height: 0%; }

.vwf-item { position: relative; display: flex; align-items: center; z-index: 3; padding: 24px; border-radius: 40px; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); margin-bottom: 16px; background: transparent; }
.vwf-item.active { background: #f8fafc; }

.vwf-left { flex: 1; display: flex; justify-content: flex-end; align-items: center; gap: 24px; padding-right: 60px; }
.vwf-icon-box { width: 64px; height: 64px; border-radius: 20px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #475569; transition: all 0.5s ease; border: 1px solid #e2e8f0; }
.vwf-num { width: 32px; height: 32px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #64748b; transition: all 0.5s ease; border: 1px solid #e2e8f0; }

.vwf-center { width: 24px; display: flex; justify-content: center; align-items: center; }
.vwf-dot { width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 4px solid #e2e8f0; transition: all 0.5s ease; position: relative; z-index: 10; box-shadow: 0 0 0 6px #fff; }

.vwf-right { flex: 1; padding-left: 60px; text-align: left; }
.vwf-right h4 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 8px; transition: all 0.5s ease; }
.vwf-right p { font-size: 14px; color: #64748b; line-height: 1.7; margin: 0; transition: all 0.5s ease; }

/* Active State Enhancements */
.vwf-item.active .vwf-icon-box { background: #0f172a; color: #fff; border-color: #0f172a; transform: scale(1.05); box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15); }
.vwf-item.active .vwf-num { background: #fff; border-color: #cbd5e1; color: #0f172a; }
.vwf-item.active .vwf-dot { border-color: #3b82f6; background: #fff; box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.1), 0 0 0 10px #f8fafc; }

@media (max-width: 768px) {
  .vwf-line-bg, .vwf-progress { left: 40px; }
  .vwf-item { flex-direction: column; align-items: flex-start; padding: 24px; }
  .vwf-left { width: 100%; justify-content: flex-start; padding-right: 0; margin-bottom: 24px; gap: 16px; padding-left: 60px; }
  .vwf-center { position: absolute; left: 28px; top: 48px; }
  .vwf-right { padding-left: 60px; }
}
`;
html = html.replace(/#about\{background:#fff\}/, verticalCss + '\n  #about{background:#fff}');


// 3. Replace HTML Structure
const oldHtml = /<section id="workflow">[\s\S]*?<\/section>/;
const newHtml = `<section id="workflow">
  <div class="vwf-container">
    <div class="vwf-header rv d1">
      <div class="vwf-label"><span>004</span> <div class="vwf-label-dot"></div> <span>PROCESS</span></div>
      <h2>How We Work</h2>
      <p>A proven process designed to transform complex workflows into scalable compliance and business systems — efficiently and strategically.</p>
    </div>
    
    <div class="vwf-timeline">
      <div class="vwf-line-bg"></div>
      <div class="vwf-progress" id="vwfProgress"></div>
      
      <!-- Step 1 -->
      <div class="vwf-item rv d2">
        <div class="vwf-left">
          <div class="vwf-icon-box"><i class="fa fa-line-chart"></i></div>
          <div class="vwf-num">01</div>
        </div>
        <div class="vwf-center">
          <div class="vwf-dot"></div>
        </div>
        <div class="vwf-right">
          <h4>Strategic Business Support</h4>
          <p>We provide clear guidance from complexity to clarity and let our clients achieve success in their business and financial frameworks.</p>
        </div>
      </div>
      
      <!-- Step 2 -->
      <div class="vwf-item rv d3">
        <div class="vwf-left">
          <div class="vwf-icon-box"><i class="fa fa-sitemap"></i></div>
          <div class="vwf-num">02</div>
        </div>
        <div class="vwf-center">
          <div class="vwf-dot"></div>
        </div>
        <div class="vwf-right">
          <h4>Business Planning</h4>
          <p>Deliver customer centric business solutions that are innovative enough to fulfill their business goals and mission.</p>
        </div>
      </div>
      
      <!-- Step 3 -->
      <div class="vwf-item rv d4">
        <div class="vwf-left">
          <div class="vwf-icon-box"><i class="fa fa-search"></i></div>
          <div class="vwf-num">03</div>
        </div>
        <div class="vwf-center">
          <div class="vwf-dot"></div>
        </div>
        <div class="vwf-right">
          <h4>Business Aspect Analysis</h4>
          <p>In-depth analysis of all aspects of your business and suggest appropriate optimization strategies to strengthen your business.</p>
        </div>
      </div>
      
    </div>
  </div>
</section>`;

html = html.replace(oldHtml, newHtml);


// 4. Replace old JS loop with GSAP ScrollTrigger logic
const oldJs = /const wfs=document\.querySelectorAll\('\.wf-step'\);[\s\S]*?\},2000\);/;
const newJs = `// --- VERTICAL WORKFLOW SCROLL ANIMATION ---
const vwfItems = gsap.utils.toArray('.vwf-item');
if (vwfItems.length > 0) {
  // Line progress
  ScrollTrigger.create({
    trigger: ".vwf-timeline",
    start: "top 60%",
    end: "bottom 60%",
    onUpdate: (self) => {
      gsap.to('#vwfProgress', { height: self.progress * 100 + '%', duration: 0.2, overwrite: true });
    }
  });

  // Active state toggling
  vwfItems.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => item.classList.add('active'),
      onLeaveBack: () => item.classList.remove('active'),
      onEnterBack: () => item.classList.add('active'),
      onLeave: () => item.classList.remove('active')
    });
  });
}`;

if(oldJs.test(html)) {
  html = html.replace(oldJs, newJs);
} else {
  html = html.replace(/<\/script>/, newJs + '\n</script>');
}

fs.writeFileSync(indexPath, html);
console.log('Vertical workflow implemented.');
