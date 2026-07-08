const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const brokenTail = `    // Phase 2: Line Progress
    vwfTl.fromTo('#vwfProgress', { height: '0%' }, { height: '100%', ease: 'none', duration: 0.75 }, 0.25);
  },1200);
}`;

const fixedTail = `    // Phase 2: Line Progress
    vwfTl.fromTo('#vwfProgress', { height: '0%' }, { height: '100%', ease: 'none', duration: 0.75 }, 0.25);
  }

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
}`;

if (html.includes(brokenTail)) {
  html = html.replace(brokenTail, fixedTail);
  fs.writeFileSync(indexPath, html);
  console.log('Restored missing form code and fixed syntax.');
} else {
  console.log('Could not find the exact broken tail string.');
}
