const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Remove old FAQ CSS
const oldCssMatch = /#faq\{background:var\(--light\)\}[\s\S]*?\.fci-lbl\{font-size:11px;color:rgba\(255,255,255,\.4\);text-transform:uppercase;letter-spacing:\.08em;margin-bottom:2px\}/;
const newCss = `/* ── FAQ MINIMAL REDESIGN ── */
#faq { background: #f5f5f6; padding: 120px 0; font-family: var(--body); color: #000; }
.faq-container { max-width: 1200px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 80px; align-items: start; }
.faq-left { position: sticky; top: 120px; }
.faq-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #555; margin-bottom: 24px; }
.faq-left h2 { font-family: var(--display); font-size: clamp(40px, 5vw, 64px); font-weight: 800; line-height: 1.1; color: #000; margin: 0; }

.faq-items { display: flex; flex-direction: column; gap: 0; }
.faq-item { overflow: hidden; transition: all 0.4s ease; }
.faq-q { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; cursor: pointer; font-family: var(--display); font-size: 18px; font-weight: 700; color: #555; user-select: none; transition: color 0.3s ease; }
.faq-item:hover .faq-q { color: #000; }
.faq-item.open .faq-q { color: #000; padding-bottom: 12px; }

.faq-ico { width: 20px; height: 20px; border-radius: 50%; background: #222; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 300; color: #fff; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.faq-item.open .faq-ico { transform: rotate(45deg); background: #000; }

.faq-a { max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease; padding: 0; font-size: 15px; color: #666; line-height: 1.7; }
.faq-item.open .faq-a { max-height: 300px; padding: 0 40px 24px 0; }

@media (max-width: 900px) {
  .faq-container { grid-template-columns: 1fr; gap: 40px; padding: 0 24px; }
  .faq-left { position: relative; top: 0; }
  .faq-left h2 br { display: none; }
}`;

if (oldCssMatch.test(html)) {
  html = html.replace(oldCssMatch, newCss);
}

// 2. Replace FAQ HTML
const oldHtmlMatch = /<section id="faq">[\s\S]*?<\/section>/;
const newHtml = `<section id="faq">
  <div class="faq-container">
    <div class="faq-left rv d1">
      <div class="faq-label">FAQ</div>
      <h2>Frequently<br>asked<br>questions.</h2>
    </div>
    <div class="faq-items">
      <div class="faq-item open rv d1">
        <div class="faq-q" onclick="tFaq(this)">How long does GST registration take?<div class="faq-ico">+</div></div>
        <div class="faq-a">GST registration typically takes 3 to 7 working days once all required documents are submitted. Our team ensures accuracy in the first submission to avoid delays or rejections from the GST portal.</div>
      </div>
      <div class="faq-item rv d2">
        <div class="faq-q" onclick="tFaq(this)">Can you handle compliance for businesses outside Kerala?<div class="faq-ico">+</div></div>
        <div class="faq-a">Absolutely. While based in Kottiyam, Kollam, we provide remote services to businesses across all Indian states. Our digital-first approach means you can onboard, communicate and receive deliverables entirely online.</div>
      </div>
      <div class="faq-item rv d3">
        <div class="faq-q" onclick="tFaq(this)">What documents are needed for company registration?<div class="faq-ico">+</div></div>
        <div class="faq-a">Requirements vary by company type but typically include PAN, Aadhaar, passport photos, proof of registered address, and DSC/DIN for directors. Our team will share a complete checklist specific to your business type upon enquiry.</div>
      </div>
      <div class="faq-item rv d4">
        <div class="faq-q" onclick="tFaq(this)">Do you offer ongoing retainer-based accounting services?<div class="faq-ico">+</div></div>
        <div class="faq-a">Yes. We offer monthly retainer packages for bookkeeping, GST filing, TDS filing, payroll processing and MIS reporting. These packages are tailored to the size and complexity of your business.</div>
      </div>
      <div class="faq-item rv d5">
        <div class="faq-q" onclick="tFaq(this)">How do I get started with MP Tax Associates?<div class="faq-ico">+</div></div>
        <div class="faq-a">Simply fill out our contact form or call us directly. We'll schedule a free consultation call within 24 hours to understand your requirements. No commitment required for the initial discussion.</div>
      </div>
    </div>
  </div>
</section>`;

html = html.replace(oldHtmlMatch, newHtml);

fs.writeFileSync(indexPath, html);
console.log('FAQ section updated to minimal design.');
