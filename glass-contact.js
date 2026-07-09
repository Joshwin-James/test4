const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldContactRegex = /<!-- ══════════════ CONTACT — PREMIUM REDESIGN ══════════════ -->[\s\S]*?<\/section>/;

const newContactHTML = `<!-- ══════════════ CONTACT — PREMIUM GLASSMORPHISM ══════════════ -->
<section id="contact" class="glass-contact-section">
  <div class="glass-ct-container">
    
    <!-- LEFT PANEL: Info -->
    <div class="glass-ct-panel ct-info-panel rv">
      <h2>Get in Touch</h2>
      <p>We're here to discuss your business needs and bring your ideas to life with premium tax, audit & compliance solutions.</p>
      
      <div class="glass-ci-list">
        <div class="ci-item">
          <div class="ci-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
          <div class="ci-txt">info@mptaxassociates.com</div>
        </div>
        <div class="ci-item">
          <div class="ci-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
          <div class="ci-txt">Kottiyam, Kollam<br>Kerala, India</div>
        </div>
        <div class="ci-item">
          <div class="ci-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
          <div class="ci-txt">+91 96339 68020<br>0474 2991293</div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL: Form -->
    <div class="glass-ct-panel ct-form-panel rvl">
      <div class="g-form-row">
        <input type="text" id="fn" placeholder="Your Name*">
        <input type="email" id="em" placeholder="Email Address*">
      </div>
      <div class="g-form-row">
        <input type="tel" id="ph" placeholder="Phone Number">
        <select id="sr">
          <option value="" disabled selected>Service Required...</option>
          <option value="gst">GST Services</option>
          <option value="itr">Income Tax</option>
          <option value="roc">Company/LLP Registration</option>
          <option value="audit">Audit & Assurance</option>
          <option value="other">Other</option>
        </select>
      </div>
      <textarea id="msg" placeholder="Write your message..."></textarea>
      
      <button class="glass-submit" onclick="submitForm(this)">Send Message</button>
      
      <div class="form-success" id="formSuccess">
        <div class="check">✓</div>
        <h4>Request Received</h4>
        <p>Our tax experts will contact you shortly.</p>
      </div>
    </div>

  </div>
</section>`;

const newCSS = `
/* ════════ GLASSMORPHISM CONTACT ════════ */
.glass-contact-section {
  position: relative;
  background: linear-gradient(135deg, #090912 0%, #151030 50%, #0a0f25 100%);
  padding: 120px 24px;
  overflow: hidden;
}
.glass-contact-section::before {
  content: ''; position: absolute; top: -20%; left: -10%; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%); border-radius: 50%;
}
.glass-contact-section::after {
  content: ''; position: absolute; bottom: -20%; right: -10%; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%); border-radius: 50%;
}
.glass-ct-container {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  position: relative;
  z-index: 10;
}
.glass-ct-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 56px 48px;
  box-shadow: 0 32px 64px rgba(0,0,0, 0.3), inset 0 1px 0 rgba(255,255,255, 0.1), inset 1px 0 0 rgba(255,255,255, 0.05);
  display: flex;
  flex-direction: column;
}
.ct-info-panel h2 {
  font-family: var(--display);
  font-size: 42px;
  color: #fff;
  margin-bottom: 24px;
  font-weight: 700;
}
.ct-info-panel p {
  color: rgba(255,255,255,0.7);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 48px;
}
.glass-ci-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: auto;
}
.ci-item {
  display: flex;
  align-items: center;
  gap: 20px;
}
.ci-ico {
  color: #60a5fa;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ci-txt {
  color: rgba(255,255,255,0.9);
  font-size: 15px;
  line-height: 1.5;
}
.ct-form-panel {
  padding: 56px;
}
.g-form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.g-form-row > * { flex: 1; }
.ct-form-panel input, .ct-form-panel select, .ct-form-panel textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 18px 24px;
  color: #fff;
  font-family: var(--body);
  font-size: 15px;
  transition: all 0.3s;
}
.ct-form-panel textarea {
  height: 140px;
  resize: none;
  margin-bottom: 24px;
}
.ct-form-panel input::placeholder, .ct-form-panel textarea::placeholder {
  color: rgba(255,255,255,0.4);
}
.ct-form-panel select {
  color: rgba(255,255,255,0.4);
  appearance: none;
}
.ct-form-panel select:focus { color: #fff; }
.ct-form-panel option { color: #000; }
.ct-form-panel input:focus, .ct-form-panel select:focus, .ct-form-panel textarea:focus {
  border-color: rgba(167, 139, 250, 0.5);
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.1);
}
.glass-submit {
  background: linear-gradient(135deg, #6366f1, #d946ef);
  border: none;
  border-radius: 40px;
  padding: 20px 32px;
  color: #fff;
  font-family: var(--body);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 12px 24px rgba(217, 70, 239, 0.3);
  transition: all 0.3s;
}
.glass-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(217, 70, 239, 0.4);
}
@media (max-width: 900px) {
  .glass-ct-container { grid-template-columns: 1fr; }
  .glass-ct-panel { padding: 40px 24px; border-radius: 24px; }
  .g-form-row { flex-direction: column; gap: 20px; }
  .glass-contact-section { padding: 80px 20px; }
}
`;

if (oldContactRegex.test(html)) {
  html = html.replace(oldContactRegex, newContactHTML);
  html = html.replace('</style>', newCSS + '\n</style>');
  fs.writeFileSync(indexPath, html);
  console.log('Replaced contact section with premium glassmorphism design.');
} else {
  console.log('Could not find the target contact section via regex.');
}
