const fs = require('fs');
const path = require('path');
const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const oldGsap = /vwfItems\.forEach\(\(item, i\) => \{[\s\S]*?toggleClass: "active"\s*\}\);\s*\}\);/g;

const newGsap = `// Pin the section and scrub timeline
  const vwfTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#workflow",
      start: "center center", 
      end: "+=150%", 
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        let p = self.progress;
        // Map progress 0-1 to item index 0,1,2
        let activeIndex = Math.min(vwfItems.length - 1, Math.floor(p * vwfItems.length));
        
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

  // Animate the line height
  vwfTl.fromTo('#vwfProgress', { height: '0%' }, { height: '100%', ease: 'none' });`;

html = html.replace(oldGsap, newGsap);

// Ensure the section looks good when pinned by centering it vertically
html = html.replace(/#workflow \{ background: var\(--dark\); padding: 60px 0;/, '#workflow { background: var(--dark); padding: 80px 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;');
// To prevent flex column from breaking the container width:
html = html.replace(/<div class="vwf-container">/, '<div class="vwf-container" style="width:100%;">');

fs.writeFileSync(indexPath, html);
console.log('Scroll locked timeline implemented.');
