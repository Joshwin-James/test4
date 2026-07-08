const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Restore original Industries HTML
const indHtmlRegex = /<!-- ══════════════ INDUSTRIES — STICKY SPLIT SCREEN ══════════════ -->[\s\S]*?<\/section>/;
const originalIndHtml = `<!-- ══════════════ INDUSTRIES — STICKY SPLIT SCREEN ══════════════ -->
<section id="industries">
  <div class="ind-header-sticky">
    <div class="slabel" style="justify-content:center">Industry Focus</div>
    <h2 class="stitle d1" style="color:var(--dark)">Expertise Across<br><span style="color:var(--grey);font-style:italic">Key Sectors</span></h2>
  </div>
  
  <div class="ind-split-container">
    <div class="ind-left-panel">
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

html = html.replace(indHtmlRegex, originalIndHtml);
fs.writeFileSync(indexPath, html);
console.log('Restored HTML');
