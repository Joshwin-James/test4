
  // Parallax Stacking Slider Logic
  window.addEventListener('load', () => {
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
      autoSlideInterval = setInterval(nextSlide, 4000);
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
