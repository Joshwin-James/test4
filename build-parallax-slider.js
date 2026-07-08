const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. REWRITE HTML STRUCTURE FOR STACKING
const oldTestimonialsHTML = /<section id="testimonials">[\s\S]*?<\/section>/;
const newTestimonialsHTML = `<section id="testimonials">
  <div class="test-wrap" style="position: relative; max-width: 900px; margin: 0 auto; text-align: center;">
    <div><div class="slabel rv" style="color:var(--orange)">Client Stories</div><h2 class="stitle stitle-w rv d1" style="margin-bottom: 48px;">Why Clients <span style="color:var(--orange)">Love Us</span></h2></div>
    
    <!-- Parallax Stacking Slider -->
    <div class="test-slider-container" style="position: relative; width: 100%; max-width: 800px; margin: 0 auto;">
      <!-- Hidden placeholder to dictate container height based on content -->
      <div class="test-slide-placeholder" style="visibility: hidden; pointer-events: none;">
        <div class="tcard" style="padding: 56px 48px; border: 1px solid transparent;"><div class="tq" style="font-size:18px; line-height:1.8; margin-bottom:32px;">This is a placeholder text to ensure the absolute positioned slides have a container height to live in. It needs to be relatively long so it matches the longest review. We approached them for an internal audit and were blown away by the depth of their financial analysis. Not only did they identify critical gaps in our stock management, but they also provided a clear strategic roadmap to optimize our working capital. Highly knowledgeable and deeply committed.</div></div>
      </div>
      
      <div class="test-stack" id="testStack">
        <!-- Review 1 -->
        <div class="test-slide stack-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">The GST Returns of my company are handled by MP Tax Associates systematically. Their service is prompt and responsible — return filing is always on time without any flaw.</div><div class="tau"><div class="tav">P</div><div><div class="tname">Pradeep Kumar</div><div class="trole">Business Owner, Kerala</div></div></div></div>
        </div>
        <!-- Review 2 -->
        <div class="test-slide stack-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">I was confused about changing GST norms and approached MP Tax Associates for advisory. Their experts gave me complete clarity on GST calculations and benefits. Truly professional.</div><div class="tau"><div class="tav">N</div><div><div class="tname">Nirmala J</div><div class="trole">Retail Entrepreneur, Kollam</div></div></div></div>
        </div>
        <!-- Review 3 -->
        <div class="test-slide stack-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">I registered my company with the help of MP Tax Associates. They guided me through the entire process and handled all paperwork. Best served — I feel completely at ease with my compliance.</div><div class="tau"><div class="tav">M</div><div><div class="tname">Mathew Immanuel</div><div class="trole">Company Director, Trivandrum</div></div></div></div>
        </div>
        <!-- Review 4 -->
        <div class="test-slide stack-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">MP Tax Associates has been a game changer for our manufacturing business. We used to struggle immensely with complex GST filings and year-end audits. Their team completely revamped our accounting processes and ensured we never missed a deadline. I highly recommend them to any enterprise looking for stress-free compliance!</div><div class="tau"><div class="tav">R</div><div><div class="tname">Ramesh Nair</div><div class="trole">Managing Director, Kochi</div></div></div></div>
        </div>
        <!-- Review 5 -->
        <div class="test-slide stack-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">As a startup founder, I had zero knowledge of ROC compliance and tax structures. The professionals at MP Tax Associates held my hand through the entire company incorporation process, secured our DPIIT recognition, and currently handle our entire payroll. Truly a one-stop premium solution.</div><div class="tau"><div class="tav">A</div><div><div class="tname">Anjali V</div><div class="trole">Tech Entrepreneur, Bangalore</div></div></div></div>
        </div>
        <!-- Review 6 -->
        <div class="test-slide stack-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">We approached them for an internal audit and were blown away by the depth of their financial analysis. Not only did they identify critical gaps in our stock management, but they also provided a clear strategic roadmap to optimize our working capital. Highly knowledgeable and deeply committed.</div><div class="tau"><div class="tav">G</div><div><div class="tname">George Kurian</div><div class="trole">CFO, Ernakulam</div></div></div></div>
        </div>
        <!-- Review 7 -->
        <div class="test-slide stack-slide">
          <div class="tcard"><div class="tstars">★★★★★</div><div class="tq">Getting our FSSAI central license and import-export code (IEC) seemed like a daunting bureaucratic nightmare. MP Tax Associates handled the documentation seamlessly and got it done in record time. Their continuous communication and transparency are unmatched in this industry.</div><div class="tau"><div class="tav">L</div><div><div class="tname">Lakshmi Sankar</div><div class="trole">Exporter, Trivandrum</div></div></div></div>
        </div>
      </div>
    </div>
    
    <!-- Controls -->
    <div class="test-controls" style="display: flex; justify-content: center; gap: 16px; margin-top: 48px; position: relative; z-index: 50;">
      <button class="test-btn" id="prevTestBtn" aria-label="Previous Review">←</button>
      <button class="test-btn" id="nextTestBtn" aria-label="Next Review">→</button>
    </div>
  </div>
</section>`;

html = html.replace(oldTestimonialsHTML, newTestimonialsHTML);

// 2. REWRITE CSS FOR ABSOLUTE STACKING
const oldSliderCSS = /\.test-track \{ display: flex; transition: transform 0\.6s cubic-bezier\(0\.25, 1, 0\.5, 1\); width: 100%; \}\n\.test-slide \{ min-width: 100%; flex-shrink: 0; padding: 0 16px; box-sizing: border-box; \}/;
const newStackCSS = `.stack-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; }
.tcard { background: rgba(255,255,255,0.03); border-radius: 32px; padding: 56px 48px; border: 1px solid rgba(255,255,255,0.1); max-width: 800px; margin: 0 auto; text-align: left; box-shadow: 0 20px 40px rgba(0,0,0,0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }`;
html = html.replace(oldSliderCSS, newStackCSS);

// 3. REWRITE JAVASCRIPT BLOCK
const oldScript = /<script>\s*\/\/\s*Testimonial Slider Logic[\s\S]*?<\/script>/;
const newScript = `<script>
  // Parallax Stacking Slider Logic
  document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.stack-slide');
    if(slides.length === 0) return;
    
    const prevBtn = document.getElementById('prevTestBtn');
    const nextBtn = document.getElementById('nextTestBtn');
    const stackContainer = document.getElementById('testStack');
    let currentIndex = 0;
    let isAnimating = false;
    let autoSlideInterval;
    
    // Initialize slides
    gsap.set(slides, { autoAlpha: 0, scale: 0.9, xPercent: -10, zIndex: 1 });
    gsap.set(slides[0], { autoAlpha: 1, scale: 1, xPercent: 0, zIndex: 10 });
    
    function animateToNextSlide(nextIdx) {
      if(isAnimating) return;
      isAnimating = true;
      
      const current = slides[currentIndex];
      const next = slides[nextIdx];
      
      // Set up next slide off-screen to the right
      gsap.set(next, { autoAlpha: 1, xPercent: 80, scale: 1, zIndex: 20 });
      
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(current, { autoAlpha: 0, zIndex: 1 }); // hide current completely
          gsap.set(next, { zIndex: 10 }); // set next as the primary
          currentIndex = nextIdx;
          isAnimating = false;
        }
      });
      
      // Incoming slide moves from right to center
      tl.to(next, { duration: 1.2, xPercent: 0, ease: "power3.out" }, 0);
      
      // Outgoing slide moves backwards, fades out, blurs (glassmorphism feel)
      tl.to(current, { 
        duration: 1.2, 
        scale: 0.85, 
        xPercent: -20, 
        opacity: 0, 
        ease: "power3.out" 
      }, 0);
    }
    
    function nextSlide() {
      const nextIdx = (currentIndex + 1) % slides.length;
      animateToNextSlide(nextIdx);
    }
    
    function prevSlide() {
      if(isAnimating) return;
      isAnimating = true;
      
      const nextIdx = (currentIndex - 1 + slides.length) % slides.length;
      const current = slides[currentIndex];
      const next = slides[nextIdx];
      
      // For prev, incoming slide comes from the BACK left, and current goes off to the right
      gsap.set(next, { autoAlpha: 0, xPercent: -20, scale: 0.85, zIndex: 10 });
      gsap.set(current, { zIndex: 20 });
      
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(current, { autoAlpha: 0, zIndex: 1 }); 
          currentIndex = nextIdx;
          isAnimating = false;
        }
      });
      
      // Incoming slide grows from back to front
      tl.to(next, { duration: 1.2, autoAlpha: 1, xPercent: 0, scale: 1, ease: "power3.out" }, 0);
      
      // Outgoing slide flies off to the right
      tl.to(current, { duration: 1.2, xPercent: 80, autoAlpha: 0, ease: "power3.out" }, 0);
    }
    
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 3000);
    }
    
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    
    if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    
    // Pause on hover
    if(stackContainer) {
      stackContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      stackContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    startAutoSlide();
  });
</script>`;

if(oldScript.test(html)) {
  html = html.replace(oldScript, newScript);
} else {
  // If it can't find the old script by regex, inject before closing body
  html = html.replace(/<\/body>/, newScript + '\n</body>');
}

fs.writeFileSync(indexPath, html);
console.log('Parallax stack logic injected successfully.');
