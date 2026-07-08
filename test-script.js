
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
// ── LOADER & HERO GSAP TIMELINE ───────────────────────────────────────────────
window.addEventListener('load',()=>{
  const l=document.getElementById('loader');
  const b=document.getElementById('lbar');
  setTimeout(()=>{b.style.width='100%'},100);
  setTimeout(()=>{
    l.classList.add('done');
    setTimeout(()=>{l.style.display='none'},700);
    
    try {
      if(typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        // 1. Navbar
        tl.fromTo("#navbar", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, clearProps: "all" }, 0.2);
        
        // 2. Badge
        tl.fromTo("#heroBadge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.4);
        
        // 4. Headline
        tl.fromTo(".hero-word", { y: "110%" }, { y: "0%", duration: 1, stagger: 0.15, ease: "power4.out" }, 0.5);
        
        // 5. Subtitle
        tl.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 1.2);
        
        // 6. CTAs & Stats
        tl.fromTo(".hero-ctas", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.4);
        tl.fromTo(".hero-stats", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.6);
        
        // 7. Scroll Indicator
        
        
        // 8. Number Counters
        tl.call(() => {
          document.querySelectorAll('.sc').forEach(el => {
            const val = parseInt(el.getAttribute('data-val'));
            if(!isNaN(val)) {
              gsap.to(el, { innerHTML: val, duration: 2, ease: "power2.out", snap: { innerHTML: 1 } });
            }
          });
        }, null, 1.6);
        
        // 9. Removed Mouse Parallax for Corporate Aesthetic
      }
    } catch (err) {
      console.warn("GSAP Animation Skipped:", err);
    }
  },2100);
});

// ── CURSOR (REMOVED) ──────────────────────────────────────────

// ── SMART HEADER ──────────────────────────────────────────────
const nb = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Dynamic Padding Shrink (32px down to 16px)
  const paddingVal = Math.max(16, 32 - (currentScrollY / 10));
  nb.style.paddingTop = `${paddingVal}px`;
  nb.style.paddingBottom = `${paddingVal}px`;

  if (currentScrollY === 0) {
    nb.classList.remove('scrolled-up', 'hide');
  } else if (currentScrollY > 100) {
    if (currentScrollY > lastScrollY) {
      nb.classList.remove('scrolled-up');
      nb.classList.add('hide'); // Scrolling down, hide header
    } else {
      nb.classList.add('scrolled-up');
      nb.classList.remove('hide'); // Scrolling up, show glassmorphism header
    }
  }
  
  lastScrollY = currentScrollY;
  
  // Progress bar
  document.getElementById('sprog').style.width=(currentScrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';
  
});

// ── SERVICES SCROLLSPY ────────────────────────────────────────
window.addEventListener('load', () => {
  const navItems = document.querySelectorAll('.svc-nav-item');
  const sections = document.querySelectorAll('.svc-block');
  
  // Mobile accordion toggle
  sections.forEach(sec => {
    const title = sec.querySelector('.svc-block-title');
    if(title) {
      title.addEventListener('click', () => {
        if(window.innerWidth <= 768) {
          sec.classList.toggle('open');
        }
      });
    }
  });

  if (window.innerWidth > 768) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            if (item.getAttribute('data-target') === id) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' }); // Trigger when section is in top half of screen

    sections.forEach(sec => observer.observe(sec));
    
    // Click to scroll
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if(targetEl) {
          window.scrollTo({
            top: targetEl.offsetTop - 140, // Offset for smart header
            behavior: 'smooth'
          });
        }
      });
    });
  }
});

// ── MOBILE ───────────────────────────────────────────────────
const ham=document.getElementById('ham'),mm=document.getElementById('mobMenu');
function tMob(){ham.classList.toggle('open');mm.classList.toggle('open');document.body.style.overflow=mm.classList.contains('open')?'hidden':''}
function cMob(){ham.classList.remove('open');mm.classList.remove('open');document.body.style.overflow=''}

// ── REVEAL & SLING ANIMATIONS ────────────────────────────────
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('vis');
      e.target.classList.add('visible');
    }
  });
}, {threshold: 0.1});
document.querySelectorAll('.rv, .rvl, .rvr, .sling-up').forEach(el => ro.observe(el));

// Stagger service cards on reveal
document.querySelectorAll('.svc-block').forEach(block => {
  const cards = block.querySelectorAll('.svc-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
  });
});

// ── COUNTERS ─────────────────────────────────────────────────
function animC(el){
  const t=parseInt(el.dataset.t),dur=1800,step=t/(dur/16);let c=0;
  const ti=setInterval(()=>{c=Math.min(c+step,t);el.textContent=Math.floor(c).toLocaleString();if(c>=t)clearInterval(ti)},16);
}
const co=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.counter').forEach(animC);co.unobserve(e.target)}})},{threshold:.3});
document.querySelectorAll('#why').forEach(s=>co.observe(s));

// ── FAQ ──────────────────────────────────────────────────────
function tFaq(el){
  const item=el.closest('.faq-item'),open=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!open)item.classList.add('open');
}

// ── WORKFLOW CYCLE ───────────────────────────────────────────
// --- VERTICAL WORKFLOW SCROLL ANIMATION ---
window.addEventListener('load', () => {
  const vwfItems = gsap.utils.toArray('.vwf-item');
    if (vwfItems.length > 0) {
      gsap.set('.vwf-header', { scale: 1.4, y: 80, transformOrigin: "center center" });
      gsap.set('.vwf-timeline', { autoAlpha: 0, y: 100 });
  
      // Phase 1: Entrance animation BEFORE it pins (seamless as you scroll down to it)
      gsap.timeline({
        scrollTrigger: {
          trigger: "#workflow",
          start: "top 80%", 
          end: "center center", 
          scrub: 1
        }
      })
      .to('.vwf-header', { scale: 1, y: 0, ease: "power2.out" }, 0)
      .to('.vwf-timeline', { autoAlpha: 1, y: 0, ease: "power2.out" }, 0);

      // Phase 2: Pinned Card Progress
      const vwfTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#workflow",
          start: "center center", 
          end: "+=200%", 
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            let lineProgress = self.progress;
            
            const timelineHeight = document.querySelector('.vwf-timeline').offsetHeight;
            const dotThresholds = vwfItems.map(item => {
              const dot = item.querySelector('.vwf-center');
              return (item.offsetTop + dot.offsetTop + (dot.offsetHeight / 2)) / timelineHeight;
            });

            let activeIndex = -1;
            if (lineProgress >= dotThresholds[0]) activeIndex = 0;
            if (lineProgress >= dotThresholds[1]) activeIndex = 1;
            if (lineProgress >= dotThresholds[2]) activeIndex = 2;

            vwfItems.forEach((item, i) => {
              if (i === activeIndex) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });
          }
        }
      });
  
      vwfTl.fromTo('#vwfProgress', { height: '0%' }, { height: '100%', ease: 'none' });
  }

});

// ── BACK TO TOP ──────────────────────────────────────────────
document.getElementById('btt').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

// ── FORM ─────────────────────────────────────────────────────
function handleForm(){
  const n=document.getElementById('fn').value.trim();
  const e=document.getElementById('em').value.trim();
  const btn=document.getElementById('fsubBtn');
  if(!n||!e){btn.style.background='#ef4444';btn.textContent='⚠ Please fill required fields';setTimeout(()=>{btn.style.background='';btn.innerHTML='Book Free Consultation <span class="arr">→</span>'},2000);return}
  btn.innerHTML='Sending...';btn.disabled=true;
  setTimeout(()=>{
    document.querySelector('.contact-form').style.display='none';
    const s=document.getElementById('formSuccess');s.style.display='flex';
  },1200);
}

// ── MAGNETIC BUTTONS (REMOVED) ───────────────────────────────
// ═══════════════════════════════════════════════════════════

        window.addEventListener('load', () => {
        // --- WHY CHOOSE US GSAP SCROLLYTELLING ---
        let whyTl;
        if(window.innerWidth > 900) {
          gsap.set('.why-center-title', { autoAlpha: 0, scale: 0.9 });
          
          whyTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".why-gsap-section",
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 1
            }
          });

          // Fade in title quickly
          whyTl.to('.why-center-title', { autoAlpha: 1, scale: 1, duration: 0.1, ease: "power2.out" }, 0);

          // Scroll columns upwards
          whyTl.to('.left-col', { yPercent: -150, ease: "none", duration: 1 }, 0)
               .to('.right-col', { yPercent: -150, ease: "none", duration: 1 }, 0);
        }

        // Count up numbers using Timeline callbacks
        const gsapCards = gsap.utils.toArray('.gsap-card');
        const countersStarted = [false, false, false, false];

        function startCount(index) {
          if(countersStarted[index] || !gsapCards[index]) return;
          countersStarted[index] = true;
          
          const card = gsapCards[index];
          const numEl = card.querySelector('.m-num');
          if(!numEl) return;
          const target = parseFloat(numEl.getAttribute('data-val'));
          let suffix = "";
          if(target === 18 || target === 5000) suffix = "+";
          if(target === 98) suffix = "%";
          
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "expo.out",
            onUpdate: () => {
              numEl.innerText = Math.floor(obj.val) + suffix;
            }
          });
        }

        if(window.innerWidth > 900) {
          whyTl.call(() => startCount(0), null, 0.15) // Card 1 (Left, top)
               .call(() => startCount(2), null, 0.30) // Card 3 (Right, top)
               .call(() => startCount(1), null, 0.55) // Card 2 (Left, bottom)
               .call(() => startCount(3), null, 0.70); // Card 4 (Right, bottom)
        } else {
          // Mobile fallback using normal ScrollTrigger
          gsapCards.forEach((card, idx) => {
            ScrollTrigger.create({
              trigger: card,
              start: "top 80%",
              once: true,
              onEnter: () => startCount(idx)
            });
          });
        }
        
        // --- INDUSTRY FOCUS STACKED CARDS ---
        const indCards = gsap.utils.toArray('.ind-unified-card');
          if(indCards.length > 0 && window.innerWidth > 900) {
            
            indCards.forEach((card, i) => {
              if(i === 0) {
                gsap.set(card, { zIndex: 10, y: 0, scale: 1 });
              } else {
                // Stack cards physically underneath the active one with a subtle offset (e.g. 40px each)
                gsap.set(card, { zIndex: 10 - i, y: i * 40, scale: 1 });
              }
            });
  
            const indTl = gsap.timeline({
              scrollTrigger: {
                trigger: "#industries",
                start: "top top", 
                // Calculate precise scroll distance to avoid dead space: 3 transitions = 300%
                end: "+=" + ((indCards.length - 1) * 100) + "%", 
                pin: true,
                scrub: 1
              }
            });
            
            // Subtle Header upward animation synced with start
            indTl.to('.ind-header-stacked', { y: -20, opacity: 0.85, scale: 0.98, ease: "power2.inOut" }, 0)
                 .to('.ind-cards-stack-container', { y: -10, ease: "power2.inOut" }, 0);
  
            indCards.forEach((card, i) => {
              if (i === 0) return;
              const prevCard = indCards[i - 1];
              
              indTl.addLabel("card" + i)
                // Dynamically pop the incoming card to the top z-index before animating it up
                .set(card, { zIndex: 20 + i }, "card" + i)
                // Slide incoming card up from its offset (e.g. 40px) to 0
                .to(card, { y: 0, ease: "power2.inOut" }, "card" + i)
                // Subtly push outgoing card back
                .to(prevCard, { scale: 0.98, opacity: 0.6, filter: "blur(2px)", ease: "power2.inOut" }, "card" + i);
            });
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
            for(let i = 0; i < 55; i++) {
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
            
            // Increased opacity and premium styling
            ctx.fillStyle = 'rgba(15, 23, 42, 0.45)'; // Nodes
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.25)'; // Connecting lines
            
            particles.forEach((p, i) => {
              p.x += p.vx;
              p.y += p.vy;
              
              if(p.x < 0 || p.x > width) p.vx *= -1;
              if(p.y < 0 || p.y > height) p.vy *= -1;
              
              // Draw nodes with subtle glow
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size + 0.5, 0, Math.PI * 2);
              ctx.fill();
              
              // Draw lines
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

});

// MP ASSISTANT CHATBOT
// ═══════════════════════════════════════════════════════════
const intentMap = [
  { keywords: ['gst registration', 'register gst', 'new gst', 'apply gst', 'gst certificate'], reply: 'GST Registration typically takes 3–7 working days. You need PAN, Aadhaar, bank statement, address proof, and business proof. We handle everything for you! 📋' },
  { keywords: ['gst return', 'file gst', 'gstr', 'late fee', 'gst filing', 'tax return'], reply: 'We file GSTR-1, GSTR-3B, GSTR-9 and all other returns on time. Monthly and quarterly options available with full reconciliation. No late fees guaranteed! ✅' },
  { keywords: ['income tax', 'itr', 'tax return', 'file tax', 'tds'], reply: 'We file ITR for individuals, HUFs, firms, and companies. Our experts ensure maximum deductions and minimum tax liability — completely legal. 💼' },
  { keywords: ['company', 'pvt ltd', 'incorporation', 'sole proprietor', 'partnership', 'register business'], reply: 'We register Pvt. Ltd., LLP, OPC, Partnership, and Sole Proprietorship firms. Full end-to-end service from name approval to incorporation certificate. 🏢' },
  { keywords: ['llp', 'limited liability'], reply: 'LLP Registration includes DPIN, DSC, LLP Agreement drafting, and MCA Form-2 filing. Usually completed in 7–14 working days. 📝' },
  { keywords: ['trademark', 'brand', 'logo registration', 'copyright', 'ipr'], reply: 'We handle Trademark Search, Application Filing, Objection Response, and Renewal. Protect your brand legally! ™️ Typically takes 18–24 months for full registration.' },
  { keywords: ['msme', 'udyam', 'ssi'], reply: 'MSME/Udyam Registration gives you access to government schemes, priority lending, and subsidies. We get it done in 1 day! 🏭' },
  { keywords: ['iec', 'import', 'export', 'trade'], reply: 'Import Export Code (IEC) from DGFT is mandatory for international trade. We handle the entire application. Usually done in 2–3 working days. 🌐' },
  { keywords: ['fssai', 'food license', 'food registration', 'restaurant'], reply: 'FSSAI Registration/License is required for all food businesses. We handle Basic, State, and Central FSSAI licenses. 🍽️' },
  { keywords: ['audit', 'internal audit', 'statutory', 'stock audit', 'ca'], reply: 'We conduct Internal Audits, Statutory Audits, Stock Audits, and GST Audits. Our CA team provides detailed reports with actionable recommendations. 🔍' },
  { keywords: ['accounting', 'bookkeeping', 'tally', 'mis report', 'accounts'], reply: 'We offer full bookkeeping, Tally/cloud accounting, MIS reports, payroll processing, and year-end account finalization. 📒' },
  { keywords: ['payroll', 'salary processing', 'pf', 'esi', 'provident fund'], reply: 'Our payroll services cover salary processing, PF & ESI, TDS on salary, Form-16 generation, and full compliance. 💰' },
  { keywords: ['advisory', 'consulting', 'fund raising', 'working capital', 'startup strategy'], reply: 'Our Business Advisory covers strategic planning, fund raising, working capital management, and growth consulting for SMEs and startups. 🧭' },
  { keywords: ['fee', 'cost', 'price', 'charge', 'much is', 'pricing'], reply: 'Our fees depend on the specific service and business size. We offer competitive, transparent pricing. Book a free consultation for a custom quote! 📞' },
  { keywords: ['contact', 'call', 'phone', 'number', 'email', 'address', 'location', 'where', 'reach', 'office'], reply: '📞 Phone: +91 96339 68020 | 0474 2991293\n✉️ Email: info@mptaxassociates.com\n📍 Kottiyam, Kollam, Kerala\n🕐 Mon-Sat: 9AM - 6PM' },
  { keywords: ['professional tax', 'pt registration'], reply: 'Professional Tax registration and return filing for businesses and employees. We handle PT compliance pan-India. 💼' },
  { keywords: ['startup', 'new business'], reply: 'Our Startup Compliance package covers incorporation, DPIIT recognition, first-year GST, ROC, and tax compliance. Perfect for new businesses! 🚀' },
  { keywords: ['dsc', 'digital signature', 'class 3'], reply: 'We provide Class 2 & Class 3 DSC for MCA filings, GST, income tax, and e-tendering. Quick delivery. 🔐' },
  { keywords: ['pan', 'tan', 'nsdl', 'pan card'], reply: 'We assist with new PAN applications, PAN corrections, TAN registration, and TAN corrections for all entity types. 📄' }
];

function chatReply(msg){
  const m = msg.toLowerCase();
  
  // Greetings
  if (m.match(/\b(hi|hello|hey|greetings|namaste)\b/)) {
    return "Hello! 👋 I'm the MP Tax AI Assistant. How can I help you today? I can answer questions about GST, Tax, Company Incorporation, and more.";
  }
  
  // Gratitude
  if (m.match(/\b(thanks|thank you|thx|ok|okay)\b/)) {
    return "You're very welcome! Let me know if you need help with anything else.";
  }
  
  // Advanced keyword array mapping (much more intelligent than simple strings)
  for (const intent of intentMap) {
    if (intent.keywords.some(kw => m.includes(kw))) {
      return intent.reply;
    }
  }
  
  // Contextual fallback based on question words
  if (m.includes('how') || m.includes('what') || m.includes('why') || m.includes('when')) {
    return "That's a great question! Tax and compliance rules can be complex and specific to your business. To give you the most accurate advice, I recommend speaking directly with our experts at +91 96339 68020.";
  }
  
  // Randomized intelligent fallbacks
  const fallbacks = [
    "I'm an automated AI assistant and I might not have the full context for that. Could you try rephrasing, or would you like our contact details?",
    "I'd love to help with that! However, for specialized or detailed advice, it's best to consult our senior CA team directly at info@mptaxassociates.com.",
    "Interesting! While I'm still learning about that specific topic, our human consultants can definitely help. Call us at +91 96339 68020 for a free consultation."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function addMsg(text,type){
  const msgs=document.getElementById('chatMsgs');
  const d=document.createElement('div');d.className=`msg ${type}`;
  if(type==='bot'){d.innerHTML=`<div class="msg-av">MP</div><div class="msg-bubble">${text.replace(/\n/g,'<br>')}</div>`}
  else{d.innerHTML=`<div class="msg-bubble">${text}</div>`}
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}

function showTyping(){
  const msgs=document.getElementById('chatMsgs');
  const d=document.createElement('div');d.className='msg bot';d.id='typing';
  d.innerHTML=`<div class="msg-av">MP</div><div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}

function removeTyping(){const t=document.getElementById('typing');if(t)t.remove()}

function sendChat(){
  const inp=document.getElementById('chatInput');
  const txt=inp.value.trim();if(!txt)return;
  addMsg(txt,'user');inp.value='';
  showTyping();
  setTimeout(()=>{removeTyping();addMsg(chatReply(txt),'bot')},900+Math.random()*600);
}

function qReply(topic){
  document.getElementById('chatQuick').style.display='none';
  addMsg(topic,'user');
  showTyping();
  setTimeout(()=>{removeTyping();addMsg(chatReply(topic),'bot')},900);
}

function toggleChat(){
  const btn=document.getElementById('chat-btn');
  const box=document.getElementById('chatbox');
  btn.classList.toggle('open');box.classList.toggle('open');
}
