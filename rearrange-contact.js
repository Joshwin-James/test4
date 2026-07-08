const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. REWRITE THE HTML OF CONTACT SECTION
const contactHtmlRegex = /<section id="contact">[\s\S]*?<\/section>/;
const newContactHtml = `<section id="contact">
  <div class="contact-bg-img"></div>
  <div class="contact-bg-ov"></div>
  <div class="contact-orb"></div>
  <div class="contact-inner">
    <div class="contact-hdr">
      <div class="slabel rv" style="justify-content:center;color:var(--orange)">Get In Touch</div>
      <h2 class="stitle stitle-w rv d1" style="color:var(--dark)">Let's Build Your Business<br><span style="color:var(--orange)">With Confidence</span></h2>
      <p class="sbody rv d2" style="color:var(--grey);margin:16px auto 0;text-align:center">Whether you're a startup, growing business or established enterprise — our experts are ready to simplify your taxation, compliance and financial management.</p>
    </div>

    <!-- FORM UNDERNEATH HEADING -->
    <div class="contact-form rvr" id="contactFormWrap" style="max-width:800px; margin:0 auto 100px;">
      <div class="form-row">
        <div class="fg">
          <input type="text" id="fn" placeholder="x" autocomplete="name">
          <label for="fn">Full Name</label>
        </div>
        <div class="fg">
          <input type="email" id="em" placeholder="x" autocomplete="email">
          <label for="em">Email Address</label>
        </div>
      </div>
      <div class="form-row">
        <div class="fg">
          <input type="tel" id="ph" placeholder="x" autocomplete="tel">
          <label for="ph">Phone Number</label>
        </div>
        <div class="fg">
          <input type="text" id="bn" placeholder="x">
          <label for="bn">Business Name</label>
        </div>
      </div>
      <div class="fg">
        <select id="sr">
          <option value="" disabled selected>Service Required</option>
          <option value="gst">GST Services</option>
          <option value="itr">Income Tax</option>
          <option value="roc">Company/LLP Registration</option>
          <option value="audit">Audit & Assurance</option>
          <option value="tm">Trademark</option>
          <option value="other">Other</option>
        </select>
        <label for="sr">Service Required</label>
      </div>
      <div class="fg">
        <textarea id="msg" placeholder="x"></textarea>
        <label for="msg">Your Message</label>
      </div>
      <button class="form-submit" onclick="submitForm(this)">BOOK FREE CONSULTATION &rarr;</button>
      
      <div class="form-success" id="formSuccess">
        <div class="check">✓</div>
        <h4>Request Received</h4>
        <p>Our tax experts will contact you shortly.</p>
      </div>
    </div>

    <!-- OUR OFFICES - 60/40 SPLIT WITH MAP ON LEFT -->
    <div class="contact-offices-grid">
      <!-- LEFT: MAP (40%) -->
      <div class="map-wrap" style="height: 100%; min-height: 400px; margin-top:0;">
        <div class="map-loader"></div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.1234567890!2d76.7063!3d8.9889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05fe3b7e3b7e3b%3A0x0!2sKottiyam%2C%20Kollam%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%" height="100%" style="border:0;display:block;position:relative;z-index:1;filter:grayscale(100%) contrast(1.1)" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="MP Tax Associates Location"></iframe>
      </div>

      <!-- RIGHT: OFFICES TEXT (60%) -->
      <div class="contact-left rvl" style="gap:32px;">
        <div>
          <div class="slabel" style="justify-content:flex-start;color:var(--orange)">Our Offices</div>
          <h2>Contact MP Tax &amp;<br>Compliance Experts</h2>
          <p style="margin-top:14px">Our team of CAs, CMAs and Tax Practitioners deliver end-to-end compliance — so you can focus entirely on growing your business.</p>
        </div>
        <div class="ci-list">
          <div class="ci-item"><div class="ci-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div><div class="ci-txt"><strong>Phone &amp; Landline</strong>+91 96339 68020 | 0474 2991293</div></div>
          <div class="ci-item"><div class="ci-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div><div class="ci-txt"><strong>Email</strong>info@mptaxassociates.com</div></div>
          <div class="ci-item"><div class="ci-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div><div class="ci-txt"><strong>Office Hours</strong>Mon – Sat: 9:00 AM – 6:00 PM</div></div>
          <div class="ci-item"><div class="ci-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="ci-txt"><strong>Address</strong>Kottiyam, Kollam, Kerala, India</div></div>
        </div>
      </div>
    </div>
  </div>
</section>`;

html = html.replace(contactHtmlRegex, newContactHtml);

// 2. REWRITE THE CSS OF CONTACT SECTION
const cssRegex = /\/\* contact grid \*\/[\s\S]*?\/\* Google Maps \*\//;
const newCss = `/* contact grid */
.contact-grid { display: block; }
.contact-offices-grid { display: grid; grid-template-columns: 4fr 6fr; gap: 80px; align-items: stretch; }
.contact-left{display:flex;flex-direction:column;gap:28px; justify-content: center;}
.contact-left h2{font-family:var(--display);font-size:clamp(36px,4vw,56px);font-weight:500;color:var(--dark);line-height:1.1}
.contact-left p{font-size:16px;color:var(--grey);line-height:1.7}
.ci-list{display:flex;flex-direction:column;gap:20px}
.ci-item{display:flex;align-items:center;gap:16px}
.ci-ico{width:48px;height:48px;border-radius:0;background:var(--dark);border:1px solid var(--dark);display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;flex-shrink:0}
.ci-txt{font-size:15px;color:var(--grey)}
.ci-txt strong{display:block;color:var(--dark);font-weight:600;margin-bottom:4px;font-size:14px}

@media(max-width: 900px) {
  .contact-offices-grid { grid-template-columns: 1fr; gap: 40px; }
  .map-wrap { height: 300px !important; }
}

/* Google Maps */`;

html = html.replace(cssRegex, newCss);

// Also change the header text color to dark so it's readable if the background is light
html = html.replace(/<h2 class="stitle stitle-w rv d1">Let's Build Your Business<br><span style="color:var\(--orange\)">With Confidence<\/span><\/h2>/, 
  `<h2 class="stitle rv d1" style="color:var(--dark)">Let's Build Your Business<br><span style="color:var(--orange)">With Confidence</span></h2>`);

fs.writeFileSync(indexPath, html);
console.log('Successfully rearranged contact section.');
