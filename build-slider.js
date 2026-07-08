const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. REBUILD HTML FOR SLIDER
const oldTestimonialsHTML = /<section id="testimonials">[\s\S]*?<\/section>/;
const newTestimonialsHTML = `<section id="testimonials">
  <div class="test-wrap" style="position: relative; max-width: 900px; margin: 0 auto; text-align: center;">
    <div><div class="slabel rv" style="color:var(--orange)">Client Stories</div><h2 class="stitle stitle-w rv d1" style="margin-bottom: 48px;">Why Clients <span style="color:var(--orange)">Love Us</span></h2></div>
    
    <div class="test-slider-container" style="overflow: hidden; position: relative;">
      <div class="test-track" id="testTrack">
        <!-- Review 1 -->
        <div class="test-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">The GST Returns of my company are handled by MP Tax Associates systematically. Their service is prompt and responsible — return filing is always on time without any flaw.</div><div class="tau"><div class="tav">P</div><div><div class="tname">Pradeep Kumar</div><div class="trole">Business Owner, Kerala</div></div></div></div>
        </div>
        <!-- Review 2 -->
        <div class="test-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">I was confused about changing GST norms and approached MP Tax Associates for advisory. Their experts gave me complete clarity on GST calculations and benefits. Truly professional.</div><div class="tau"><div class="tav">N</div><div><div class="tname">Nirmala J</div><div class="trole">Retail Entrepreneur, Kollam</div></div></div></div>
        </div>
        <!-- Review 3 -->
        <div class="test-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">I registered my company with the help of MP Tax Associates. They guided me through the entire process and handled all paperwork. Best served — I feel completely at ease with my compliance.</div><div class="tau"><div class="tav">M</div><div><div class="tname">Mathew Immanuel</div><div class="trole">Company Director, Trivandrum</div></div></div></div>
        </div>
        <!-- Review 4 -->
        <div class="test-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">MP Tax Associates has been a game changer for our manufacturing business. We used to struggle immensely with complex GST filings and year-end audits. Their team completely revamped our accounting processes and ensured we never missed a deadline. I highly recommend them to any enterprise looking for stress-free compliance!</div><div class="tau"><div class="tav">R</div><div><div class="tname">Ramesh Nair</div><div class="trole">Managing Director, Kochi</div></div></div></div>
        </div>
        <!-- Review 5 -->
        <div class="test-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">As a startup founder, I had zero knowledge of ROC compliance and tax structures. The professionals at MP Tax Associates held my hand through the entire company incorporation process, secured our DPIIT recognition, and currently handle our entire payroll. Truly a one-stop premium solution.</div><div class="tau"><div class="tav">A</div><div><div class="tname">Anjali V</div><div class="trole">Tech Entrepreneur, Bangalore</div></div></div></div>
        </div>
        <!-- Review 6 -->
        <div class="test-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">We approached them for an internal audit and were blown away by the depth of their financial analysis. Not only did they identify critical gaps in our stock management, but they also provided a clear strategic roadmap to optimize our working capital. Highly knowledgeable and deeply committed.</div><div class="tau"><div class="tav">G</div><div><div class="tname">George Kurian</div><div class="trole">CFO, Ernakulam</div></div></div></div>
        </div>
        <!-- Review 7 -->
        <div class="test-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">Getting our FSSAI central license and import-export code (IEC) seemed like a daunting bureaucratic nightmare. MP Tax Associates handled the documentation seamlessly and got it done in record time. Their continuous communication and transparency are unmatched in this industry.</div><div class="tau"><div class="tav">L</div><div><div class="tname">Lakshmi Sankar</div><div class="trole">Exporter, Trivandrum</div></div></div></div>
        </div>
      </div>
    </div>
    
    <!-- Controls -->
    <div class="test-controls" style="display: flex; justify-content: center; gap: 16px; margin-top: 32px;">
      <button class="test-btn" id="prevTest" aria-label="Previous Review">←</button>
      <button class="test-btn" id="nextTest" aria-label="Next Review">→</button>
    </div>
  </div>
</section>`;
html = html.replace(oldTestimonialsHTML, newTestimonialsHTML);

// 2. UPDATE CSS FOR SLIDER
// We will replace .test-grid with slider CSS
const oldGridCSS = /\.test-grid\{display:grid;grid-template-columns:repeat\(auto-fit,minmax\(300px,1fr\)\);gap:32px;margin-top:64px\}/;
const sliderCSS = `.test-track { display: flex; transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); width: 100%; }
.test-slide { min-width: 100%; flex-shrink: 0; padding: 0 16px; box-sizing: border-box; }
.test-btn { width: 56px; height: 56px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 20px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; }
.test-btn:hover { background: #fff; color: var(--dark); transform: scale(1.05); }`;
html = html.replace(oldGridCSS, sliderCSS);

// Ensure the tcard is nicely formatted for a single slide view
html = html.replace(/\.tcard\{background:rgba\(255,255,255,\.03\);border-radius:0;padding:40px;border:1px solid rgba\(255,255,255,\.1\)\}/g,
  `.tcard{background:rgba(255,255,255,.03);border-radius:24px;padding:56px 48px;border:1px solid rgba(255,255,255,.1); max-width: 800px; margin: 0 auto; text-align: left;}`);
html = html.replace(/\.tq\{font-size:16px;color:rgba\(255,255,255,\.7\);line-height:1\.7;margin-bottom:24px;min-height:120px\}/g,
  `.tq{font-size:18px;color:rgba(255,255,255,.9);line-height:1.8;margin-bottom:32px;}`);

// 3. INJECT JAVASCRIPT SLIDER LOGIC
// We'll place it right before the closing </body> tag
const jsLogic = `
<script>
  // Testimonial Slider Logic
  document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testTrack');
    const prevBtn = document.getElementById('prevTest');
    const nextBtn = document.getElementById('nextTest');
    let currentIndex = 0;
    const slides = document.querySelectorAll('.test-slide');
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    function updateSlider() {
      track.style.transform = \`translateX(-\${currentIndex * 100}%)\`;
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    }
    
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 3000);
    }
    
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    
    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', startAutoSlide);
    
    startAutoSlide();
  });
</script>
</body>`;

html = html.replace(/<\/body>/, jsLogic);

fs.writeFileSync(indexPath, html);
console.log('Slider logic injected successfully.');
